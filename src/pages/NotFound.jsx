import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-200 p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-700 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-green-500 text-white font-semibold px-6 py-3 rounded hover:bg-green-600"
      >
        Go to Home
      </Link>
    </div>
  );
}
