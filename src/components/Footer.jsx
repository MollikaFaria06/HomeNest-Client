import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiX } from 'react-icons/si'; 

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-gray-900 to-black border-t border-gray-800 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
        
        {/* Branding & Contact */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-600 to-yellow-500 flex items-center justify-center text-white font-bold shadow-md">
              HN
            </div>
            <div>
              <div className="font-semibold text-green-500 font-bold text-xl">🏡HomeNest</div>
              <div className="text-sm text-pink-300">Real estate simplified</div>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            HomeNest is your trusted platform for finding, listing, and managing real estate properties 
            with ease. Whether you’re buying, renting, or selling — we make the process seamless and secure.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            📞 +8801306518217 <br />
            ✉️ contact@homenest.com
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="font-semibold text-lg mb-3 text-yellow-400">Quick Links</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/all-properties" className="hover:text-yellow-400 transition">
                All Properties
              </Link>
            </li>
            <li>
              <Link to="/add-property" className="hover:text-yellow-400 transition">
                Add Property
              </Link>
            </li>
            <li>
              <Link to="/my-properties" className="hover:text-yellow-400 transition">
                My Properties
              </Link>
            </li>
            <li>
              <Link to="/my-ratings" className="hover:text-yellow-400 transition">
                My Ratings
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <div className="font-semibold text-lg mb-3 text-yellow-400">Follow Us</div>
          <div className="flex gap-4">
            <a
              aria-label="X (Twitter)"
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-full transition-colors"
            >
              <SiX size={18} />
            </a>

            <a
              aria-label="Facebook"
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-full transition-colors"
            >
              <FaFacebook size={18} />
            </a>

            <a
              aria-label="Instagram"
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-full transition-colors"
            >
              <FaInstagram size={18} />
            </a>
          </div>

          <div className="mt-5 text-xs text-gray-400">
            <Link to="/terms" className="hover:text-yellow-400 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">HomeNest</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
