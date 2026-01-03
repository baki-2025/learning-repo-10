import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import RootLayout from "../components/layouts/RootLayout.jsx";
import DashboardLayout from "../components/layouts/DashBoardLayout.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Login from "../pages/Auth/Login.jsx";
import Courses from "../pages/Courses/Courses.jsx";
import MyCourses from "../pages/Dashboard/MyCourses.jsx";
import AddCourse from "../pages/Dashboard/AddCourse.jsx";
import EnrolledCourses from "../pages/Dashboard/EnrolledCourses.jsx";
import UpdateCourse from "../pages/Dashboard/UpdateCourse.jsx";
import CourseDetails from "../pages/Courses/CourseDetails.jsx";
import Register from "../pages/Auth/Register.jsx";
import AboutUs from "../components/AboutUs.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/courses", element: <Courses /> },
      
      {
        path: "/courseDetails/:id",
        element: (
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "my-courses", element: <MyCourses /> },
      { path: "add-course", element: <AddCourse /> },
      { path: "enrolled", element: <EnrolledCourses /> },
      { path: "updateCourse/:id", element: <UpdateCourse /> },
      

    ],
  },
  {
  path: "/about",
  element: <AboutUs />
},

]);

export default router;
