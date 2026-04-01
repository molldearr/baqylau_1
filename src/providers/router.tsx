import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../components/MainPage/MainPage';
import { DishPage } from '../components/Dish/DishPage';
import { RegisterPage } from '../components/Account/Register/RegisterPage';
import { LoginPage } from '../components/Account/Login/LoginPage';


export const router = createBrowserRouter([
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/', element: <MainPage /> },
  { path: '/dishes/:id', element: <DishPage /> },
]);
