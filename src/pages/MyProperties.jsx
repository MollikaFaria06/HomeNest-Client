import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api"; // Axios instance

export default function MyProperties() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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
        const { data } = await api.delete(`/properties/${id}`); // JWT auto attach
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

  if (loading)
    return <div className="text-center mt-10 text-lg text-gray-300">Loading your properties...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-teal-900 to-black p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-400">
        My <span className="text-teal-300">Properties</span>
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-300">You haven’t added any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-black rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg text-red-500 font-bold">{property.title}</h3>
                <p className="text-gray-300">
                  <strong>Category:</strong>{" "}
                  <span className="text-yellow-400">{property.type}</span>
                </p>
                <p className="text-green-500 font-bold mt-1">
                  Price: ${property.price.toLocaleString()}
                </p>
                <p className="text-blue-400 mt-1">Place: {property.location}</p>
                <p className="text-sm text-purple-400 mt-1">
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
