import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="max-w-4xl mx-auto mt-12 px-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-6 border border-gray-200 dark:border-zinc-700">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{singleJob?.title}</h1>
                        <div className="flex flex-wrap gap-2 mt-3">
                            <Badge className="bg-blue-100 text-blue-700 font-medium">{singleJob?.postion} Positions</Badge>
                            <Badge className="bg-red-100 text-red-600 font-medium">{singleJob?.jobType}</Badge>
                            <Badge className="bg-purple-100 text-purple-700 font-medium">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`mt-2 md:mt-0 px-6 py-2 rounded-lg text-white font-medium transition duration-200 ${
                            isApplied
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-purple-700 hover:bg-purple-600'
                        }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <hr className="border-t border-gray-300 dark:border-zinc-700" />

                <div className="space-y-3 text-gray-800 dark:text-gray-300">
                    <p><span className="font-semibold text-purple-700 dark:text-gray-200">Role:</span> {singleJob?.title}</p>
                    <p><span className="font-semibold text-purple-700 dark:text-gray-200">Location:</span> {singleJob?.location}</p>
                    <p><span className="font-semibold text-purple-700 dark:text-gray-200">Description:</span> {singleJob?.description}</p>
                    <p><span className="font-semibold text-purple-700 dark:text-gray-200">Experience:</span> {singleJob?.experience} yrs</p>
                    <p><span className="font-semibold text-purple-700 dark:text-gray-200">Salary:</span> {singleJob?.salary} LPA</p>
                    <p><span className="font-semibold text-purple-700 dark:text-gray-200">Total Applicants:</span> {singleJob?.applications?.length}</p>
                    <p><span className="font-semibold text-purple-700 dark:text-gray-200">Posted Date:</span> {singleJob?.createdAt?.split("T")[0]}</p>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
