import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="overflow-x-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl transition-all duration-300">
            <Table>
                <TableCaption className="text-gray-600">Your recent job postings</TableCaption>
                <TableHeader className="bg-gradient-to-r from-indigo-200 to-blue-200">
                    <TableRow>
                        <TableHead className="text-gray-800 font-semibold tracking-wide">Company Name</TableHead>
                        <TableHead className="text-gray-800 font-semibold tracking-wide">Role</TableHead>
                        <TableHead className="text-gray-800 font-semibold tracking-wide">Date</TableHead>
                        <TableHead className="text-right text-gray-800 font-semibold tracking-wide">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id} className="hover:bg-indigo-50/60 transition-all duration-300">
                                <TableCell className="text-gray-700 font-medium">{job?.company?.name}</TableCell>
                                <TableCell className="text-gray-700">{job?.title}</TableCell>
                                <TableCell className="text-gray-600">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <MoreHorizontal className="text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 p-2 rounded-xl shadow-lg border border-gray-200">
                                            <div 
                                                onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                className="flex items-center gap-2 p-2 rounded-md hover:bg-indigo-100 cursor-pointer transition">
                                                <Edit2 className='w-4 text-indigo-600' />
                                                <span className="text-sm font-medium text-gray-700">Edit</span>
                                            </div>
                                            <div 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className="flex items-center gap-2 p-2 rounded-md hover:bg-indigo-100 mt-1 cursor-pointer transition">
                                                <Eye className='w-4 text-indigo-600' />
                                                <span className="text-sm font-medium text-gray-700">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable;
