import React from 'react';
import { Link } from 'react-router';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
    <p className="text-gray-600 mb-6">Page not found</p>
    <Link to="/" className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      Go Home
    </Link>
  </div>
);

export default NotFound;
