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
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="font-bold text-2xl text-gray-800 my-6">
                    Applicants {applicants?.applications?.length}
                </h1>
                {/* You can display loading/error messages here */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    {applicants?.applications?.length === 0 ? (
                        <p className="text-center text-gray-600">No applicants found for this job.</p>
                    ) : (
                        <ApplicantsTable />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Applicants;
