import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogsData from "../data/blogsData";
import { useTheme } from "../context/ThemeContext";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const blog = blogsData.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Blog not found
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-16 px-6 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-green-950 via-teal-900 to-black text-white"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-green-400 mb-6 hover:underline"
        >
          ← Back to Blogs
        </button>

        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-xl mb-6"
        />

        <h1 className="text-4xl font-bold text-green-400 mb-2">
          {blog.title}
        </h1>

        <p className="text-yellow-400 text-sm mb-6">
          {blog.date} • {blog.author} • {blog.readTime}
        </p>

        <p className="text-gray-300 leading-7 whitespace-pre-line">
          {blog.content}
        </p>
      </div>
    </div>
  );
}
