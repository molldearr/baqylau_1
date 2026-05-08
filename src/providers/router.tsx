import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../components/MainPage/MainPage';
import { DishPage } from '../components/Dish/DishPage';
import { RegisterPage } from '../components/Account/Register/RegisterPage';
import { LoginPage } from '../components/Account/Login/LoginPage';
import { AdminDashboard } from '../components/Admin/AdminDashboard';
import { AdminLoginPage } from '../components/Account/Login/AdminLoginPage';
import { ExperimentsPage } from '../components/Experiments/ExperimentsPage';
import { Layout } from '../components/Layout/Layout';

export const router = createBrowserRouter([
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/admin_login', element: <AdminLoginPage /> },
  { path: '/dashboard', element: <AdminDashboard /> },
  {
    element: <Layout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/dishes/:id', element: <DishPage /> },
      { path: '/experiments', element: <ExperimentsPage /> },
    ]
  }
]);