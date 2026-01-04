// src/components/home/Blogs.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import blogsData from "../../data/blogsData";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Blogs() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Home এ সব blogs দেখানো হবে
  const blogsToShow = blogsData;

  // AOS initialization
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      once: true,    // animation happens only once
    });
  }, []);

  return (
    <section
      className={`py-20 px-6 transition-colors ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-green-950 via-teal-900 to-black text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-green-400 mb-3">
            Latest <span className="text-teal-300">Blogs</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Stay updated with expert tips, real estate insights, and property trends from HomeNest.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogsToShow.map((blog) => (
            <div
              key={blog.id}
              data-aos="fade-up"
              className={`rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform duration-300 ${
                theme === "dark" ? "bg-gray-800" : "bg-black/70"
              }`}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <p className="text-sm text-yellow-400 mb-1">{blog.date}</p>
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {blog.description}
                </p>

                <button
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                  className="text-green-400 font-medium hover:text-green-300 transition"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
