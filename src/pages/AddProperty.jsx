// src/pages/AddProperty.jsx
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api"; // Axios instance
import { useTheme } from "../context/ThemeContext"; // Theme context

export default function AddProperty() {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme(); // Theme toggle
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Rent",
    price: "",
    location: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return Swal.fire("Login Required", "Please login first.", "warning");

    const propertyData = {
      ...formData,
      price: parseFloat(formData.price),
      owner: {
        name: user?.displayName || user?.name || "Unknown User",
        email: user?.email,
      },
      createdAt: new Date(),
    };

    setLoading(true);
    try {
      await api.post("/properties", propertyData);
      Swal.fire({
        title: "Success!",
        text: "Property added successfully.",
        icon: "success",
        confirmButtonColor: "#16a34a",
      });
      setFormData({
        title: "",
        description: "",
        type: "Rent",
        price: "",
        location: "",
        image: "",
      });
      navigate("/my-properties");
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to add property.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-10 transition-colors ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-green-950 via-teal-900 to-black text-white"
      }`}
    >
      <div
        className={`w-full max-w-2xl p-8 rounded-2xl shadow-lg border transition-colors ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-black/60 border-green-800/40 backdrop-blur-md"
        }`}
      >
        <h2
          className={`text-4xl font-bold text-center mb-8 transition-colors ${
            theme === "dark" ? "text-green-400" : "text-green-400"
          }`}
        >
          Add New Property
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Property fields */}
          {[
            { label: "Property Name", name: "title", type: "text", placeholder: "Enter property name" },
            { label: "Description", name: "description", type: "textarea", placeholder: "Write property details..." },
            { label: "Price (in BDT)", name: "price", type: "number", placeholder: "Enter price" },
            { label: "Location", name: "location", type: "text", placeholder: "e.g., Dhanmondi, Dhaka" },
            { label: "Image URL", name: "image", type: "text", placeholder: "Paste image link" },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block font-semibold mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-gray-600 focus:ring-green-500"
                      : "bg-white/90 text-black border-green-700 focus:ring-green-500"
                  }`}
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-gray-600 focus:ring-green-500"
                      : "bg-white/90 text-black border-green-700 focus:ring-green-500"
                  }`}
                />
              )}
            </div>
          ))}

          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-green-500"
                  : "bg-white/90 text-black border-green-700 focus:ring-green-500"
              }`}
            >
              <option>Rent</option>
              <option>Sale</option>
              <option>Commercial</option>
              <option>Land</option>
            </select>
          </div>

          {/* Owner Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">User Name</label>
              <input
                type="text"
                value={user?.displayName || user?.name || "Unknown"}
                readOnly
                className={`w-full px-3 py-2 rounded-md transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-200 text-black border-green-800"
                }`}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">User Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className={`w-full px-3 py-2 rounded-md transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-200 text-black border-green-800"
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 py-2 font-bold rounded-md transition-colors ${
              theme === "dark"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {loading ? "Adding..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
}
