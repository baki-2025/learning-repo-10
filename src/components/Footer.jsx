import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full h-full bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="max-w-full mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"  // replace with your logo path
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-xl font-semibold text-white">Learning Hub</h2>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
            <FaTwitter />
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
