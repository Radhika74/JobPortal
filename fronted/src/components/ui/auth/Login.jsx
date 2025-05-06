import { setLoading, setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });

    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Login failed');
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) navigate('/');
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
                <Card className="w-full max-w-md shadow-xl border border-gray-200 rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-3xl text-center text-purple-700 font-bold mb-6">
                            Login
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5 px-6 pb-6">
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 my-2 text-center">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="patel@gmail.com"
                                    required
                                    className="bg-blue-50"
                                />
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    required
                                    className="bg-blue-50"
                                />
                            </div>

                            <div>
                                <Label className="mb-2 block text-sm font-medium text-gray-700">Select Role</Label>
                                <RadioGroup
                                    defaultValue=""
                                    className="flex gap-6"
                                    onValueChange={(val) => setInput({ ...input, role: val })}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="student" id="student" />
                                        <Label htmlFor="student">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="recruiter" id="recruiter" />
                                        <Label htmlFor="recruiter">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {loading ? (
                                <Button className="w-full bg-purple-500" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                                >
                                    Login
                                </Button>
                            )}

                            <p className="text-sm text-center mt-4">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-purple-700 font-medium hover:underline">
                                    Signup
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default Login;
