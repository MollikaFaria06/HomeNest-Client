import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Axios instance
import { useTheme } from "../context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AllProperties() {
  const { theme } = useTheme();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await api.get("/properties", {
          params: { search, sort },
        });
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [search, sort]);

  // Skeleton card component
  const SkeletonCard = () => (
    <div
      className={`rounded-2xl overflow-hidden animate-pulse ${
        theme === "dark" ? "bg-gray-800" : "bg-black/40"
      }`}
    >
      <div className="w-full h-64 bg-gray-600/30" />
      <div className="p-4 space-y-2">
        <div className="h-6 bg-gray-500 rounded w-3/4"></div>
        <div className="h-4 bg-gray-500 rounded w-1/2"></div>
        <div className="h-4 bg-gray-500 rounded w-2/3"></div>
        <div className="h-8 bg-gray-500 rounded w-full mt-2"></div>
      </div>
    </div>
  );

  return (
    <div
      className={`p-6 min-h-screen transition-colors ${
        theme === "dark"
          ? "bg-gray-900"
          : "bg-gradient-to-br from-green-950 via-teal-900 to-black"
      }`}
    >
      <h1
        className={`text-4xl font-bold text-center mb-8 transition-colors ${
          theme === "dark" ? "text-green-400" : "text-green-400"
        }`}
      >
        All <span className="text-teal-300">Properties</span>
      </h1>

      <div className="flex mb-6 justify-between gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by Property Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border-2 w-full md:w-2/3 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors ${
            theme === "dark"
              ? "border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:ring-green-500"
              : "border-green-600 bg-black/30 text-white placeholder-gray-400 focus:ring-green-500"
          }`}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={`border-2 w-full md:w-48 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors ${
            theme === "dark"
              ? "border-gray-700 bg-gray-800 text-white focus:ring-green-500"
              : "border-green-600 bg-black/30 text-white focus:ring-green-500"
          }`}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="date-asc">Date ↑</option>
          <option value="date-desc">Date ↓</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : properties.map((property, idx) => (
              <div
                key={property._id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className={`rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${
                  theme === "dark" ? "bg-gray-800" : "bg-black"
                }`}
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl text-green-500 font-semibold mb-1">
                    {property.title}
                  </h2>
                  <p className="text-yellow-400 mb-1">
                    Category: <span className="text-yellow-400">{property.type}</span>
                  </p>
                  <p className="text-yellow-400 font-bold mb-1">
                    Price: ${property.price?.toLocaleString() || "N/A"}
                  </p>
                  <p className="text-yellow-400 font-medium mb-2">
                    Location: {property.location}
                  </p>
                  <p className="text-yellow-400 font-medium mb-2">
                    Posted by: {property.owner?.name || "Unknown"}
                  </p>
                  <button
                    onClick={() => navigate(`/property/${property._id}`)}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
