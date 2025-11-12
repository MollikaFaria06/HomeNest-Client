import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UpdateProperty() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: "",
    description: "",
    type: "Rent",
    price: "",
    location: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch existing property details
  useEffect(() => {
    fetch(`http://localhost:5000/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading property:", err);
        setLoading(false);
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(`http://localhost:5000/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });

      if (res.ok) {
        Swal.fire({
          title: "Updated!",
          text: "Property updated successfully.",
          icon: "success",
          confirmButtonColor: "#16a34a",
        }).then(() => {
          // Redirect to MyProperties page instead of property details
          navigate("/my-properties");
        });
      } else {
        const data = await res.json();
        Swal.fire("Error", data.message || "Failed to update property.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong while updating.", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading property data...</p>
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-green-200 flex items-center justify-center py-10 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            Update Property
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Property Name */}
            <div>
              <label className="block font-semibold mb-1">Property Name</label>
              <input
                type="text"
                name="title"
                value={property.title}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-green-500"
                placeholder="Enter property name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-green-500"
                placeholder="Write property details..."
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                name="type"
                value={property.type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md focus:outline-green-500"
              >
                <option>Rent</option>
                <option>Sale</option>
                <option>Commercial</option>
                <option>Land</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block font-semibold mb-1">Price (in BDT)</label>
              <input
                type="number"
                name="price"
                value={property.price}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-green-500"
                placeholder="Enter price"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-semibold mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={property.location}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-green-500"
                placeholder="e.g., Dhanmondi, Dhaka"
              />
            </div>

            {/* Image Link */}
            <div>
              <label className="block font-semibold mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={property.image}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-green-500"
                placeholder="Paste image link"
              />
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">User Name</label>
                <input
                  type="text"
                  value={user?.displayName || user?.name || "Unknown"}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">User Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md bg-gray-100"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={updating}
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md transition"
            >
              {updating ? "Updating..." : "Update Property"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
