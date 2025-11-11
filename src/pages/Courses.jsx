import React from 'react';
import { NavLink } from 'react-router';

const Courses = () => {
    return (
        <div>
        <li><NavLink to ="/all Courses">All Courses</NavLink></li>
         <li><NavLink to ="/course Details">Course Details</NavLink></li>
        </div>
    );
};

export default Courses;