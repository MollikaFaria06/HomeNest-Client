import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Axios instance

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

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

  if (loading)
    return <p className="text-center mt-10 text-lg text-gray-300">Loading properties...</p>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-950 via-teal-900 to-black">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-400">
        All <span className="text-teal-300">Properties</span>
      </h1>

      <div className="flex mb-6 justify-between gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by Property Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 w-full md:w-2/3 border-green-600 bg-black/30 text-white placeholder-gray-400 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border-2 w-full md:w-48 border-green-600 bg-black/30 text-white px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="date-asc">Date ↑</option>
          <option value="date-desc">Date ↓</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-black rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl text-red-500 font-semibold mb-1">{property.title}</h2>
              <p className="text-gray-300 mb-1">
                Category: <span className="text-yellow-400">{property.type}</span>
              </p>
              <p className="text-green-500 font-bold mb-1">
                Price: ${property.price?.toLocaleString() || "N/A"}
              </p>
              <p className="text-blue-400 font-medium mb-2">Location: {property.location}</p>
              <p className="text-purple-400 font-medium mb-2">
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
