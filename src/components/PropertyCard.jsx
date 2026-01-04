import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg p-4 bg-black flex flex-col transition-colors">
      <img
        src={property.image || "https://via.placeholder.com/400x200"}
        alt={property.title}
        className="w-full h-48 object-cover rounded-md"
      />

      <h3 className="text-xl text-green-500 font-semibold mt-3">{property.title}</h3>
      <p className="text-yellow-400">{property.location}</p>

      <p className="text-yellow-400 font-medium text-sm mt-2 mb-2 line-clamp-3">
        Description: {property.description || "No description available."}
      </p>

      <p className="text-yellow-400 font-medium mt-2">Category: {property.type}</p>
      <p className="text-yellow-400 font-medium mt-2">Price: ${property.price?.toLocaleString() || "N/A"}</p>

      <Link to={`/property/${property._id}`} className="mt-3">
        <button className="bg-green-500 text-black p-2 rounded-lg font-semibold hover:bg-yellow-300 w-full transition-colors">
          View Details
        </button>
      </Link>
    </div>
  );
}
