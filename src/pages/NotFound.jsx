import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-950 via-teal-900 to-black p-4 text-white">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl text-yellow-400 font-semibold mb-2">Page Not Found!</h2>
      <p className="text-gray-300 text-lg mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-green-500 text-white font-semibold px-6 py-3 rounded hover:bg-green-600 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
