import { StrictMode } from 'react'
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


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
       {
      path: 'courses',
      Component: Courses,
     },
     {
      path:'dashboard',
      Component: DashBoard
     },
     {
      path: 'register',
      Component: Register
     }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
   <RouterProvider router={router} />,
   </AuthProvider>
  </StrictMode>,
)
