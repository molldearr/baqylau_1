import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../components/MainPage';



export const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },

]);