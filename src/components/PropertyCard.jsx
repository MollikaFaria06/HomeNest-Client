import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg p-4 bg-black flex flex-col">
      <img
        src={property.image || "https://via.placeholder.com/400x200"}
        alt={property.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-xl text-orange-500 font-semibold mt-3">{property.title}</h3>
      <p className="text-blue-500">{property.location}</p>

      
      <p className="text-pink-200 font-bold text-sm mt-2 mb-2 line-clamp-3">Description:  { property.description || "No description available."}
      </p>

      <p className="text-yellow-500 font-bold mt-2">Category: {property.type}</p>

      <p className="text-green-500 font-bold mt-2">Price: ${property.price}</p>

      <Link to={`/property/${property._id}`} className="mt-3">
        <button className="btn bg-green-500 text-white p-2 rounded-lg font-semibold hover:bg-green-600 w-full">
          View Details
        </button>
      </Link>
    </div>
  );
}