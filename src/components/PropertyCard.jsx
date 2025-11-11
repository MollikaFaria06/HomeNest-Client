// src/components/PropertyCard.jsx
import React from "react";

export default function PropertyCard({ property }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg p-4 bg-white">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-xl font-semibold mt-3">{property.title}</h3>
      <p className="text-gray-500">{property.location}</p>
      <p className="text-green-600 font-bold mt-2">${property.price}</p>
      <button className="mt-3 btn bg-green-500 text-white hover:bg-green-600 w-full">
        View Details
      </button>
    </div>
  );
}
