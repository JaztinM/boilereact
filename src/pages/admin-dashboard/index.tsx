import { lazy } from 'react';
import MainLayout from './layouts/MainLayout';

// Import CSS
import './admin.css';

// Lazy load admin pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FlaggedPosts = lazy(() => import('./pages/FlaggedPosts'));
const VerificationPage = lazy(() => import('./pages/VerificationPage'));
const AdminLogin = lazy(() => import('./pages/Login'));

// Export the routes configuration
export const adminRoutes = [
    {
        path: '/admin',
        element: <MainLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'flagged',
                element: <FlaggedPosts />,
            },
            {
                path: 'verification',
                element: <VerificationPage />,
            }
        ],
    },
    {
        path: '/admin/login',
        element: <AdminLogin />,
    }
];

// Export components individually
export { default as Dashboard } from './pages/Dashboard';
export { default as FlaggedPosts } from './pages/FlaggedPosts';
export { default as VerificationPage } from './pages/VerificationPage';
export { default as AdminLogin } from './pages/Login';