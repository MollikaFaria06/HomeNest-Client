// src/pages/MyProperties.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api"; // Axios instance
import { useTheme } from "../context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MyProperties() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/user-properties"); // JWT auto attach
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This property will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setDeletingId(id);
        const { data } = await api.delete(`/properties/${id}`);
        Swal.fire("Deleted!", data.message || "Property has been removed.", "success");
        setProperties((prev) => prev.filter((prop) => prop._id !== id));
      } catch (err) {
        console.error(err);
        Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const renderSkeleton = () => {
    const skeletons = Array.from({ length: 8 }).map((_, idx) => (
      <div
        key={idx}
        className={`animate-pulse rounded-2xl overflow-hidden shadow-lg h-80 ${
          theme === "dark" ? "bg-gray-700" : "bg-black/40"
        }`}
      >
        <div className={`h-56 w-full ${theme === "dark" ? "bg-gray-600" : "bg-gray-800"}`}></div>
        <div className="p-4 space-y-2">
          <div className="h-5 w-3/4 bg-gray-500 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-500 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-500 rounded"></div>
          <div className="h-8 w-full bg-gray-500 rounded mt-2"></div>
        </div>
      </div>
    ));
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {skeletons}
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-green-950 via-teal-900 to-black text-white"
      }`}
    >
      <h2
        className={`text-4xl font-bold mb-8 text-center transition-colors ${
          theme === "dark" ? "text-green-400" : "text-green-400"
        }`}
      >
        My <span className="text-teal-300">Properties</span>
      </h2>

      {loading ? (
        renderSkeleton()
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-300">You haven’t added any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property, idx) => (
            <div
              key={property._id}
              data-aos="fade-up"
              data-aos-delay={idx * 100} // staggered animation
              className={`rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${
                theme === "dark" ? "bg-gray-800" : "bg-black"
              }`}
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg text-green-500 font-bold">{property.title}</h3>
                <p className="text-yellow-500">
                  <strong>Category:</strong>{" "}
                  <span className="text-yellow-500">{property.type}</span>
                </p>
                <p className="text-yellow-500 font-bold mt-1">
                  Price: ${property.price.toLocaleString()}
                </p>
                <p className="text-yellow-500 mt-1">Place: {property.location}</p>
                <p className="text-sm text-yellow-500 mt-1">
                  Posted on: {new Date(property.createdAt).toLocaleDateString("en-GB")}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => navigate(`/update-property/${property._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(property._id)}
                    disabled={deletingId === property._id}
                    className={`px-3 py-1 rounded text-white ${
                      deletingId === property._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {deletingId === property._id ? "Deleting..." : "Delete"}
                  </button>
                  <Link
                    to={`/property/${property._id}`}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
