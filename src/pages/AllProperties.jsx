import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/properties?search=${search}&sort=${sort}`)
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [search, sort]);

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className="p-6 bg-yellow-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Properties</h1>

      <div className="flex mb-6 justify-between gap-4">
        <input
          type="text"
          placeholder="Search by Property Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 w-2/3  border-green-300 bg-green-100 text-black px-2  py-1 rounded"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border-2  px-2 py-1 w-48 border-green-300 bg-green-100 text-black  rounded">
          <option value="">Sort by</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="date-asc">Date ↑</option>
          <option value="date-desc">Date ↓</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="bg-black rounded-lg shadow-md overflow-hidden">
            <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl text-orange-600 font-semibold mb-1">{property.title}</h2>
              <p className="text-blue-700 font-semibold mb-1">Category: {property.type}</p>
              <p className="text-green-600 font-bold mb-1">Price: ${property.price.toLocaleString()}</p>
              <p className="text-yellow-600 font-semibold mb-2">Location: {property.location}</p>
              <p className="text-purple-600 font-semibold mb-2">Posted by: {property.owner.name}</p>
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
