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
    <div className="bg-gradient-to-tr from-indigo-100 via-sky-100 to-purple-100 min-h-screen font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <Input
              className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="Search by title or role..."
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
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
    </div>
  )
}

export default AdminJobs
