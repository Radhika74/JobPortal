'use client';

import { Button } from '@/components/ui/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from '@/components/ui/ui/dialog';
import { Input } from '@/components/ui/ui/input';
import { Label } from '@/components/ui/ui/label';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
            <DialogContent className="sm:max-w-[500px] w-full bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl z-50 border border-gray-200 dark:border-gray-700">
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onSubmit={submitHandler}
                >
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-purple-600 dark:text-white">
                            Update Profile
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                            Make changes to your profile. Click update when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-5 py-6">
                        {[
                            { id: "fullname", label: "Name", type: "text", value: input.fullname },
                            { id: "email", label: "Email", type: "email", value: input.email },
                            { id: "phoneNumber", label: "Phone", type: "text", value: input.phoneNumber },
                            { id: "bio", label: "Bio", type: "text", value: input.bio },
                            { id: "skills", label: "Skills", type: "text", value: input.skills },
                        ].map(({ id, label, type, value }) => (
                            <div key={id} className="grid gap-2">
                                <Label htmlFor={id} className="text-sm font-medium text-purple-500 dark:text-gray-300">
                                    {label}
                                </Label>
                                <Input
                                    id={id}
                                    name={id}
                                    type={type}
                                    value={value}
                                    onChange={changeEventHandler}
                                    className="focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 hover:shadow-sm transition duration-200 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                />
                            </div>
                        ))}

                        <div className="grid gap-2">
                            <Label htmlFor="file" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Resume (PDF)
                            </Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="cursor-pointer file:text-sm file:font-medium file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 file:rounded-md dark:file:bg-purple-900 dark:file:text-purple-300 dark:hover:file:bg-purple-800 transition"
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button
                            type="submit"
                            className="w-full bg-[#6A38C2] hover:bg-[#572fac] text-white font-semibold transition duration-200"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                'Update'
                            )}
                        </Button>
                    </DialogFooter>
                </motion.form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
