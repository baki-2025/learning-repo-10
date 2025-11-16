// import React, { use } from 'react';
// import { Navigate, useLocation } from 'react-router';
// import { AuthContext } from '../contexts/AuthContext';




// const PrivateRoute = ({ children }) => {
//     const { user, loading } = use(AuthContext);

//     const location = useLocation();
//     console.log(location)

//     if (loading) {
//         return <span className="loading loading-spinner text-success"></span>
//     }

//     if (user) {
//         return children;
//     }

//     return <Navigate state={location?.pathname} to="/register"></Navigate>;
// };

// export default PrivateRoute;


import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
