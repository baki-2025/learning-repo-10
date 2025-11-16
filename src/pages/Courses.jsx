import React from "react";
import { NavLink } from "react-router"; // Use react-router-dom

const Courses = () => {
  return (
    <ul className="flex gap-4">
      <li>
        <NavLink
          to="/all-courses"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 font-bold" : "text-gray-700 dark:text-gray-300"
          }
        >
          All Courses
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/course-details"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 font-bold" : "text-gray-700 dark:text-gray-300"
          }
        >
          Course Details
        </NavLink>
      </li>
    </ul>
  );
};

export default Courses;
