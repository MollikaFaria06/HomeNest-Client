import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyProperties() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only user's properties
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/user-properties?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, [user]);

  // Delete Property
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This property will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/properties/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Property has been removed.", "success");
              setProperties((prev) => prev.filter((p) => p._id !== id));
            }
            else {
      Swal.fire("Error", "Failed to delete property.", "error");
    }
          });
          
      }
    });
  };

  if (loading) return <div className="text-center mt-10">Loading your properties...</div>;

  return (
    <div className="max-w-6xl bg-yellow-200 mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My <span className="text-green-600">Properties</span>
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t added any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-md rounded-lg overflow-hidden border"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg text-orange-700 font-bold">{property.title}</h3>
                <p className="text-gray-600"><strong>Type:</strong> {property.type}</p>
                <p className="text-green-800 font-bold">${property.price.toLocaleString()}</p>
                <p className="text-yellow-700">{property.location}</p>
                <p className="text-sm text-purple-700 mt-1">
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
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/properties/${property._id}`}
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
