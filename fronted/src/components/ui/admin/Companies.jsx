import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CompaniesTable from './CompaniesTable';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <Input
                        className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 rounded-md border border-gray-300 shadow-sm"
                        placeholder="Filter by company name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        className="bg-[#5d6adb] text-white hover:opacity-90 px-6 py-2 rounded-md shadow-md"
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        New Company
                    </Button>
                </div>
                <div className="bg-white shadow-lg rounded-2xl p-4">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
};

export default Companies;
