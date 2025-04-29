import { LogOut, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar.jsx';
import { Button } from '../ui/button.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const Navbar = () => {
    const user =false;// your state access pattern

    return (
        <div className='bg-white shadow w-full fixed top-0 left-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>
                {/* Logo */}
                <div>
                    <h1 className='text-2xl font-bold'>
                        Job<span className='text-[#F83002]'>Portal</span>
                    </h1>
                </div>

                {/* Navigation + User Actions */}
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-6 text-gray-800'>
                        {user?.role === 'recruiter' ? (
                            <>
                                <li>Companies</li>
                                <li>Jobs</li>
                            </>
                        ) : (
                            <>
                                <li>Home</li>
                                <li>Jobs</li>
                                <li>Browse</li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to='/login'><Button variant="outline">Login</Button></Link>
                            <Link to='/signup'><Button variant="outline">SignUp</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'} alt="User" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-3 items-center'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto || 'https://github.com/shadcn.png'} alt="User" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio || 'No bio'}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2 text-gray-700'>
                                        {user?.role === 'student' && (
                                            <Link to="/profile" className='flex items-center gap-2'>
                                                <User2 size={18} />
                                                <span className='text-sm'>View Profile</span>
                                            </Link>
                                        )}
                                        <button className='flex items-center gap-2 text-sm hover:underline'>
                                            <LogOut size={18} />
                                            Logout
                                        </button>
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
