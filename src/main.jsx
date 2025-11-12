import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './components/layouts/RootLayout.jsx';
import Home from './pages/Home.jsx';
import DashBoard from './components/layouts/DashBoard.jsx';
import Courses from './pages/Courses.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Register from './pages/Register.jsx';
import CourseCard from './components/CourseCard.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import NotFound from './pages/NotFound.jsx'; // ✅ Make sure this file exists



const router = createBrowserRouter([
    {
    path: '/',
    element: <RootLayout />, // ✅ must use `element`
    errorElement: <NotFound />, // ✅ must use valid JSX
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'dashboard',
        element: <DashBoard />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'course-card', // ✅ no spaces allowed
        element: (
          <PrivateRoute>
            <CourseCard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);