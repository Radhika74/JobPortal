import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition cursor-pointer space-y-4'
        >
            {/* Company Info */}
            <div>
                <h1 className='text-xl font-semibold text-[#110f14] py-0'>{job?.company?.name}</h1>
                {/* <p className='text-sm text-gray-500'>India</p> */}
            </div>

            {/* Job Title & Description */}
            <div>
                <h2 className='text-lg font-bold text-[#6A38C2]'>{job?.title}</h2>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            {/* Job Info Badges */}
            <div className='flex flex-wrap items-center gap-2'>
                <Badge className='text-[#6A38C2] font-semibold border border-[#6A38C2]' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-semibold border border-[#F83002]' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='text-[#6A38C2] font-semibold border border-[#6A38C2]' variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
