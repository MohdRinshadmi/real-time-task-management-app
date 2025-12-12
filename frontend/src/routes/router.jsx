import { Navigate } from 'react-router-dom';
import MainDashboard from '../views/MainDashboard';

 const routes = [
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
    },
    {
        path: '/dashboard',
        element: <MainDashboard />
    }
 ]

 export default routes;