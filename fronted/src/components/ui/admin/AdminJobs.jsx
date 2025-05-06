import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import AdminJobsTable from './AdminJobsTable'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 rounded-md border border-gray-300 shadow-sm"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="ml-4 bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-md shadow-md"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs
