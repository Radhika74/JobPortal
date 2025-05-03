import { setLoading } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }

    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <form onSubmit={submitHandler} className="w-full max-w-md border border-gray-300 rounded-xl shadow-md p-6 bg-white">
                    <h1 className="font-bold text-3xl mb-6 text-center">Sign Up</h1>

                    <div className="mb-4">
                        <Label htmlFor="fullname" className="mb-2 block">Full Name</Label>
                        <Input
                            id="fullname"
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-2 block">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="john@example.com"
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="phone" className="mb-2 block">Phone Number</Label>
                        <Input
                            id="phone"
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="password" className="mb-2 block">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                            className="mt-1"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center gap-2">
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <button
                            type="button"
                            disabled
                            className="w-full bg-[#6A38C2] text-white font-medium py-2 rounded-lg mt-4 hover:bg-[#8961cf] transition-all flex items-center justify-center"
                        >
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full  bg-[#6A38C2] text-white font-medium py-2 rounded-lg mt-4 mb-2 hover:bg-[#8961cf] transition-all"
                        >
                            Sign Up
                        </button>
                    )}


                    <span className="text-sm">
                        Already Have an Account?{" "}
                        <Link to="/login" className="text-[#6A38C2] hover:underline">
                            Login
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );

};

export default Signup;
