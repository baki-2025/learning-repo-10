import React from "react";
import { GiBurningBook } from "react-icons/gi";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full h-full bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="max-w-full mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
         <GiBurningBook />
          <h2 className="text-xl font-semibold text-white">Learning Hub</h2>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaFacebook />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
            <BsTwitterX />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaLinkedin />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} Learning Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
