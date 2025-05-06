import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { Contact, Mail, Pen } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AppliedJobTable from './AppliedJobTable';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Label } from './ui/label';
import UpdateProfileDialog from './UpdateProfileDialog';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const skills = user?.profile?.skills || [];
    const hasResume = !!user?.profile?.resume;

    return (
        <div>
            <Navbar />

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                alt="profile"
                            />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-xl">{user?.fullname || 'NA'}</h1>
                            <p className="text-sm text-gray-600">{user?.profile?.bio || 'No bio available'}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" size="icon">
                        <Pen size={18} />
                    </Button>
                </div>

                {/* Contact Info */}
                <div className="my-5 space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                        <Mail />
                        <span>{user?.email || 'NA'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Contact />
                        <span>{user?.phoneNumber || 'NA'}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className="my-5">
                    <h1 className="font-semibold mb-2">Skills</h1>
                    <div className="flex flex-wrap items-center gap-2">
                        {skills.length > 0 ? skills.map((skill, index) => (
                            <Badge key={index}>{skill}</Badge>
                        )) : <span>NA</span>}
                    </div>
                </div>

                {/* Resume */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {hasResume ? (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={user?.profile?.resume}
                            className="text-blue-500 hover:underline"
                        >
                            {user?.profile?.resumeOriginalName || 'View Resume'}
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl px-8 pb-8">
                <h1 className="font-bold text-lg my-5 pt-6">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Profile Edit Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
