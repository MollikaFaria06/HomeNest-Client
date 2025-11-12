import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function MyProperties() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // optional, to disable delete button while deleting

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

  // Delete Property with confirmation
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
        const res = await fetch(`http://localhost:5000/properties/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          Swal.fire("Deleted!", data.message || "Property has been removed.", "success");
          // Remove deleted property from UI instantly
          setProperties((prev) => prev.filter((prop) => prop._id !== id));
        } else {
          Swal.fire("Failed", data.message || "Could not delete property", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong", "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading your properties...</div>;

  return (
    <div className="max-w-full bg-yellow-200 mx-auto p-6">
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
                <p className="text-blue-600"><strong>Category:</strong> {property.type}</p>
                <p className="text-green-500 font-bold mt-1">${property.price.toLocaleString()}</p>
                <p className="text-yellow-700  mt-1">{property.location}</p>
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
                    disabled={deletingId === property._id} // disable button while deleting
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
