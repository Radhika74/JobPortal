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
    <div className="bg-gray-50  min-h-screen font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        {/* <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-10"> */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <Input
              className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 rounded-md border border-gray-300 shadow-sm"
              placeholder="Search by title or role..."
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              className="bg-[#6A38C2] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
              onClick={() => navigate("/admin/jobs/create")}
            >
              + New Job
            </Button>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md">
            <AdminJobsTable />
          </div>
        </div>
      </div>
    // </div>
  )
}

export default AdminJobs
