import { NavLink, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-green-300 p-5">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="menu">

          <li><NavLink to="/dashboard/my-enrolled">My Enrolled Courses</NavLink></li>
          <li><NavLink to="/dashboard/add-course">Add Course</NavLink></li>
          <li><NavLink to="/dashboard/my-added">My Added Courses</NavLink></li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;
