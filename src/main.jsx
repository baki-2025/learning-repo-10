import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './components/layouts/RootLayout.jsx';
import Home from './pages/Home.jsx';

import Courses from './pages/Courses.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Register from './pages/Register.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import NotFound from './pages/NotFound.jsx'; // ✅ Make sure this file exists

import DashboardLayout from './components/layouts/DashBoardLayout.jsx';
import MyEnrolledCourses from './pages/MyEnrolledCourses';
import AddCourse from './pages/AddCourse.jsx';
import MyAddedCourses from './pages/MyAddedCourses.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound></NotFound> ,
    children: [
      { index: "true", element: <Home /> },
      { path: "/courses", element: <Courses /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "my-enrolled", element: <MyEnrolledCourses /> },
      { path: "add-course", element: <AddCourse /> },
      { path: "my-added", element: <MyAddedCourses /> },
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