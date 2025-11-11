import { Outlet, NavLink } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-green-900 text-white p-5">
        
        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard/add-course">Add Course</NavLink>
          <NavLink to="/dashboard/my added-courses">My Added Courses</NavLink>
          <NavLink to="/dashboard/update-course">Update Course</NavLink>
          <NavLink to="/dashboard/my-enrolled course"> My Enrolled Course</NavLink>
        </nav>
      </aside>
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};
export default Dashboard;
