// src/pages/About.jsx
import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* Hero / Intro Section */}
      <section className="bg-gradient-to-br from-green-950 via-teal-900 to-black text-gray-900 py-20 text-center px-5">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">About HomeNest</h1>
        <p className="text-lg text-yellow-500 md:text-xl max-w-2xl mx-auto">
          HomeNest is a modern real estate platform designed to make property browsing, listing, and management simple and reliable.
        </p>
      </section>

      {/* Our Mission */}
      <section className="py-16 max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Our Mission"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-green-500 dark:text-green-400">Our Mission & Vision</h2>
          <p className="mb-4">
            Our mission is to simplify property searching, listing, and management. We aim to combine technology, convenience, and trust into a single platform.
          </p>
          <p>
            Our vision is to become the most user-friendly real estate platform in the country, helping people find their dream homes quickly and safely.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-10 text-yellow-500 dark:text-yellow-400">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">John Doe</h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Founder & CEO</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">Jane Smith</h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Co-Founder</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://randomuser.me/api/portraits/men/55.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">Mike Johnson</h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Tech Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-gradient-to-br from-green-950 via-teal-900 to-black text-yellow-500">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Exploring Properties Today!</h2>
        <p className="mb-6">Find your dream home or list your property with ease.</p>
        <button
          onClick={() => window.location.href = '/all-properties'}
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
        >
          Browse Properties
        </button>
      </section>
    </div>
  );
}
