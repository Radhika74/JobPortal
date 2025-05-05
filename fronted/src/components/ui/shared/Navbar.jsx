import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    };

    // const navLinkClasses = "relative hover:text-[#b32fc4] transition font-medium after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#b32fc4] after:transition-all after:duration-300";
    const navLinkClasses = "relative hover:text-[#6A38C2] transition font-medium after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#6A38C2] after:transition-all after:duration-300";

    return (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
            <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Job<span className="text-[#6A38C2]">Nexa</span>
                </h1>

                <div className="flex items-center gap-10">
                    <ul className="flex items-center gap-5 text-gray-700 dark:text-gray-100">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies" className={navLinkClasses}>Companies</Link></li>
                                <li><Link to="/admin/jobs" className={navLinkClasses}>Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" className={navLinkClasses}>Home</Link></li>
                                <li><Link to="/jobs" className={navLinkClasses}>Jobs</Link></li>
                                <li><Link to="/browse" className={navLinkClasses}>Browse</Link></li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button className="bg-[#6A38C2] hover:bg-[#5930a7] text-white">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5930a7] text-white">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border-2 border-purple-400 dark:border-purple-300 hover:ring-2 ring-purple-300 dark:ring-purple-500 transition">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 dark:bg-gray-800 dark:text-white border dark:border-gray-600">
                                <div className="flex gap-3 items-start">
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold text-lg">{user?.fullname}</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">{user?.profile?.bio}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col gap-2 text-gray-700 dark:text-gray-200">
                                    {user?.role === 'student' && (
                                        <div className="flex items-center gap-2 hover:text-[#6A38C2] transition">
                                            <User2 size={18} />
                                            <Link to="/profile">
                                                <Button variant="link" className="p-0 h-auto text-sm">View Profile</Button>
                                            </Link>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 hover:text-red-500 transition">
                                        <LogOut size={18} />
                                        <Button onClick={logoutHandler} variant="link" className="p-0 h-auto text-sm text-left">
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
