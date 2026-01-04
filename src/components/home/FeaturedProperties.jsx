import React, { useEffect, useState } from "react";
import PropertyCard from "../PropertyCard";
import api from "../../api"; // Axios instance with JWT
import { useTheme } from "../../context/ThemeContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchProperties = async () => {
      try {
        const res = await api.get("/properties");
        const data = res.data;

        // Sort by newest first and take top 8
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProperties(sorted.slice(0, 8));
      } catch (err) {
        console.error("Failed to fetch featured properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const SkeletonCard = () => (
    <div
      className={`rounded-2xl shadow-lg overflow-hidden animate-pulse ${
        theme === "dark" ? "bg-gray-800" : "bg-black/40"
      }`}
    >
      <div className="w-full h-48 bg-gray-700"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
        <div className="h-3 bg-gray-600 rounded w-1/3"></div>
        <div className="h-6 bg-gray-600 rounded w-full mt-2"></div>
      </div>
    </div>
  );

  return (
    <section
      className={`max-w-full mx-auto px-4 py-12 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-green-950 via-teal-900 to-black text-white"
      }`}
    >
      <h2
        className={`text-3xl font-bold text-center mb-8 ${
          theme === "dark" ? "text-yellow-400" : "text-yellow-400"
        }`}
        data-aos="fade-down"
      >
        Featured{" "}
        <span className={theme === "dark" ? "text-green-400" : "text-green-400"}>
          Properties
        </span>
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : properties.map((p, idx) => (
              <div key={p._id} data-aos="fade-up" data-aos-delay={idx * 100}>
                <PropertyCard property={p} />
              </div>
            ))}
      </div>
    </section>
  );
}
