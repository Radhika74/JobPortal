import { setAllApplicants } from '@/redux/applicationSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Applicants
                        <span className="ml-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium shadow-sm">
                            {applicants?.applications?.length || 0}
                        </span>
                    </h1>
                </div>

                <div className="bg-white/90 shadow-xl rounded-2xl p-6">
                    {applicants?.applications?.length === 0 ? (
                        <div className="text-center text-gray-600 py-10">
                            <p className="text-lg font-medium">No applicants found for this job.</p>
                        </div>
                    ) : (
                        <ApplicantsTable />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Applicants;
