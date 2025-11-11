import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/properties')
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching properties:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className="p-6 bg-yellow-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl text-orange-600 font-semibold mb-1">{property.title}</h2>
              <p className="text-blue-700 font-semibold mb-1">Category: {property.type}</p>
              <p className="text-green-600 font-bold mb-1">
                Price: ${property.price.toLocaleString()}
              </p>
              <p className="text-yellow-600 font-semibold mb-2">Location: {property.location}</p>
              <p className="text-red-800 mb-2 text-sm">
                Posted by: {property.owner?.name || 'Unknown'}
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
