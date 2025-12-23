import { Navigate } from 'react-router-dom';
import MainDashboard from '../views/dashboard/MainDashboard';
import Register from '../views/register/Register';
import TaskBoard from '../components/taskBoard/TaskBoard';

 const routes = [
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/dashboard',
        element: <MainDashboard />
    },
    // {
    //     path: '/task-board',
    //     element: <TaskBoard />
    // },
 ]

 export default routes;