import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Browse from './components/ui/Browse'
import Home from './components/ui/Home'
import JobDescription from './components/ui/JobDescription'
import Jobs from './components/ui/Jobs'
import Profile from './components/ui/Profile'
import AdminJobs from './components/ui/admin/AdminJobs'
import Applicants from './components/ui/admin/Applicants'
import Companies from './components/ui/admin/Companies'
import CompanyCreate from './components/ui/admin/CompanyCreate'
import CompanySetup from './components/ui/admin/CompanySetup'
import PostJob from './components/ui/admin/PostJob'
import ProtectedRoute from './components/ui/admin/ProtectedRoute'
import Login from './components/ui/auth/Login'
import Signup from './components/ui/auth/Signup'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App