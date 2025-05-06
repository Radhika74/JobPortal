import { setSearchedQuery } from '@/redux/jobSlice';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim() !== "") {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }
    };

    return (
        <div className="text-center px-4 py-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
                <span className="mx-auto px-4 py-2 rounded-full bg-[#ede5fb] text-[#6C3FCF] font-semibold text-sm shadow-sm dark:bg-[#2d1e42] dark:text-[#bfa7ff]">
                    🚀 No. 1 Job Portal
                </span>

                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
                    Search, Apply & <br />
                    Get Your <span className="text-[#6C3FCF] dark:text-[#bfa7ff]">Dream Job</span>
                </h1>

                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
                    Find jobs that match your skills, passion, and ambition – all in one place.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full shadow-md focus-within:ring-2 focus-within:ring-[#6C3FCF] overflow-hidden">
                    <input
                        type="text"
                        placeholder="Find your dream job..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-grow px-6 py-3 text-sm md:text-base outline-none bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-300"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="flex items-center gap-2 px-6 py-3 rounded-none rounded-r-full bg-[#6C3FCF] hover:bg-[#5930a7] dark:bg-[#bfa7ff] dark:hover:bg-[#a488f5] text-white dark:text-black transition-all"
                    >
                        <Search className="h-5 w-5" />
                        <span className="hidden sm:inline">Search</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
