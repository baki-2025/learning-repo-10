// import React from 'react';
// import { NavLink } from 'react-router';

// const Courses = () => {
//     return (
//         <div>
//         <li><NavLink to ="/all Courses">AllCourses</NavLink></li>
//          <li><NavLink to ="/course Details">Course Details</NavLink></li>
//         </div>
//     );
// };

// export default Courses;



import React from 'react';
import { NavLink } from 'react-router';

const Courses = () => {
  return (
    <ul className="flex gap-4">
      <li>
        <NavLink
          to="/all-courses"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 font-bold" : "text-gray-700"
          }
        >
          All Courses
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/course-details"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 font-bold" : "text-gray-700"
          }
        >
          Course Details
        </NavLink>
      </li>
    </ul>
  );
};

export default Courses;
