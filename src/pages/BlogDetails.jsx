// src/pages/BlogDetails.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogsData from "../data/blogsData";
import { useTheme } from "../context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Fix: string comparison
  const blog = blogsData.find((b) => b.id.toString() === id);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-950 text-white">
        <h2 className="text-3xl font-bold mb-4">Blog Not Found</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="text-green-400 hover:underline"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <section
      className={`min-h-screen py-20 px-6 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-green-950 via-teal-900 to-black text-white"
      }`}
    >
      <div className="max-w-4xl mx-auto" data-aos="fade-up">
        <button
          onClick={() => navigate(-1)}
          className="text-green-400 mb-6 hover:underline"
          data-aos="fade-right"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold mb-4" data-aos="fade-up">
          {blog.title}
        </h1>

        <p className="text-gray-400 mb-6" data-aos="fade-up" data-aos-delay="100">
          {blog.date} · {blog.readTime} · {blog.author}
        </p>

        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-xl mb-10 w-full"
          data-aos="zoom-in"
          data-aos-delay="200"
        />

        <article className="text-gray-200 leading-8 whitespace-pre-line" data-aos="fade-up" data-aos-delay="300">
          {blog.content}
        </article>
      </div>
    </section>
  );
}
