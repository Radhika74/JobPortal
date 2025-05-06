import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);

    const toggleSave = () => setSaved(!saved);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-200 space-y-4 transition hover:shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button 
                    variant="outline" 
                    className="rounded-full hover:bg-[#f4f0fb]" 
                    size="icon" 
                    onClick={toggleSave}
                >
                    {saved ? (
                        <BookmarkCheck className="text-[#6A38C2]" />
                    ) : (
                        <Bookmark className="text-[#6A38C2]" />
                    )}
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border">
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>
                <div>
                    <h2 className="text-lg font-semibold text-[#6A38C2]">{job?.company?.name}</h2>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            {/* Job Info */}
            <div>
                <h1 className="text-xl font-bold text-gray-800">{job?.title}</h1>
                <p className="text-sm text-gray-600 mt-1">{job?.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
                <Badge className="text-[#6A38C2] font-semibold" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-semibold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#6A38C2] font-semibold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline" 
                    className="hover:border-[#6A38C2] hover:text-[#6A38C2]"
                >
                    View Details
                </Button>
                <Button 
                    onClick={toggleSave} 
                    className={`transition text-white px-5 py-2 rounded-md ${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-[#6A38C2] hover:bg-[#5b2db4]'}`}
                >
                    {saved ? 'Saved!' : 'Save for Later'}
                </Button>
            </div>
        </div>
    );
};

export default Job;
