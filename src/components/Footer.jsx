import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
     
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-600 to-yellow-500 flex items-center justify-center text-white font-bold">
              HN
            </div>
            <div>
              <div className="font-semibold text-white">HomeNest</div>
              <div className="text-xs text-white">Real estate simplified</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-white">
            Contact: +8801XXXXXXXXX
            <br />
            Email: contact@homenest.example
          </p>
        </div>

       
        <div>
          <div className="font-medium text-white mb-2">Quick Links</div>
          <ul className="text-sm text-white space-y-1">
            <li>
              <Link to="/all-properties" className="hover:underline">
                All Properties
              </Link>
            </li>
            <li>
              <Link to="/add-property" className="hover:underline">
                Add Property
              </Link>
            </li>
            <li>
              <Link to="/my-properties" className="hover:underline">
                My Properties
              </Link>
            </li>
            <li>
              <Link to="/my-ratings" className="hover:underline">
                My Ratings
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <div className="font-medium mb-2 text-white">Follow Us</div>
          <div className="flex gap-3">
            <a
              aria-label="Twitter"
              href="#"
              className="p-2 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              aria-label="Facebook"
              href="#"
              className="p-2 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <FaFacebook size={20} />
            </a>
            <a
              aria-label="Instagram"
              href="#"
              className="p-2 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          </div>
          <div className="mt-4 text-xs text-white">
            <Link to="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 text-xs text-white flex justify-between">
          <span>© {new Date().getFullYear()} HomeNest. All rights reserved.</span>
          <span>Designed with ❤️</span>
        </div>
      </div>
    </footer>
  );
}
