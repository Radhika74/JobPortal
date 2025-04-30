import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/ui/auth/Login';
import Signup from './components/ui/auth/Signup';
import Browse from './components/ui/Browse';
import Home from './components/ui/Home';
import Jobs from './components/ui/Jobs';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,  // Set a default page (e.g., Home or a Landing component)
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path:'/Jobs',
    element: <Jobs/>
  },
  {
    path:'/Browse',
    element: <Browse/>
  }
]);

function App() {
  return (
      <RouterProvider router={appRouter} />
  );
}

export default App;
