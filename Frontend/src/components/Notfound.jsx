import React from "react";
import { NavLink } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 text-indigo-500">
          404
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-300">
          Oops! The page you're looking for doesn't exist.
        </p>
        <NavLink
          to="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg text-sm sm:text-base font-medium transition"
        >
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Notfound;

