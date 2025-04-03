"use client";

import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full flex justify-center items-center px-8 py-4 bg-white shadow-md z-50">
      <div className="flex space-x-6">
        <button className="text-gray-700 hover:text-blue-600 font-medium">
          Home
        </button>
        <button className="text-gray-700 hover:text-blue-600 font-medium">
          About
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
