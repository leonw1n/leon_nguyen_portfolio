"use client";

import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer1 = () => {
  return (
    <footer className="w-full bg-#ceddf3 py-3 flex justify-center space-x-6">
      <a
        href="https://www.linkedin.com/in/leonhnguyen"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-blue-600 text-2xl"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://github.com/leonhnguyen"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-gray-900 text-2xl"
      >
        <FaGithub />
      </a>
      <a
        href="mailto:leon.nguyen654@gmail.com"
        className="text-gray-700 hover:text-red-500 text-2xl"
      >
        <FaEnvelope />
      </a>
    </footer>
  );
};

export default Footer1;
