// src/pages/About.jsx
import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  const { theme } = useTheme();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Hero / Intro Section */}
      <section
        data-aos="fade-up"
        className={`py-24 px-5 text-center transition-colors rounded-b-3xl ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-yellow-400'
            : 'bg-gradient-to-br from-green-900 via-teal-900 to-black text-yellow-400'
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-green-400">HomeNest</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Discover, list, and manage real estate properties effortlessly with our modern, intuitive platform.
          We make finding your dream home fast, safe, and reliable.
        </p>
      </section>

      {/* Our Mission */}
      <section
        data-aos="fade-up"
        className="py-16 max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="md:w-1/2" data-aos="fade-right">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Our Mission"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2" data-aos="fade-left">
          <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`}>
            Our Mission & Vision
          </h2>
          <p className="mb-4 leading-relaxed">
            Our mission is to simplify property searching, listing, and management. We aim to combine technology, convenience, and trust into a single platform.
          </p>
          <p className="leading-relaxed">
            Our vision is to become the most user-friendly real estate platform in the country, helping people find their dream homes quickly and safely.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section data-aos="fade-up" className={`py-16 transition-colors ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h2 className={`text-3xl font-bold mb-10 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`}>
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: 'John Doe', role: 'Founder & CEO', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { name: 'Jane Smith', role: 'Co-Founder', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'Mike Johnson', role: 'Tech Lead', img: 'https://randomuser.me/api/portraits/men/55.jpg' },
            ].map((member, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className={`p-6 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
                }`}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 ring-2 ring-green-500"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-aos="fade-up"
        data-aos-delay="100"
        className={`py-20 px-5 text-center rounded-t-3xl transition-colors ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-yellow-400'
            : 'bg-gradient-to-br from-green-900 via-teal-900 to-black text-yellow-400'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
          Start Your Property Journey Today
        </h2>
        <p className="mb-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Browse thousands of properties or list your own. Experience a seamless real estate platform designed for modern users.
        </p>
        <button
          onClick={() => window.location.href = '/all-properties'}
          className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition transform hover:-translate-y-1 shadow-lg"
        >
          Explore Properties
        </button>
      </section>
    </div>
  );
}
