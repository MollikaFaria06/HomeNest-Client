import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function AddProperty() {
  const { user } = useContext(AuthContext);
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
      title: formData.title,
      description: formData.description,
      type: formData.type,
      price: parseFloat(formData.price),
      location: formData.location,
      image: formData.image,
      owner: {
        name: user?.displayName || user?.name || "Unknown User",
        email: user?.email,
      },
      createdAt: new Date(),
    };

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });

      if (res.ok) {
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
      } else {
        Swal.fire("Error", "Failed to add property.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 bg-gradient-to-br from-green-950 via-teal-900 to-black text-white">
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-2xl border border-green-800/40">
        <h2 className="text-4xl font-bold text-center text-green-400 mb-8">
          Add New Property
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block font-semibold mb-1">Property Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-green-700 bg-white/90 text-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter property name"
            />
          </div>

          
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-green-700 bg-white/90 text-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write property details..."
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-green-700 bg-white/90 text-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Rent</option>
              <option>Sale</option>
              <option>Commercial</option>
              <option>Land</option>
            </select>
          </div>

         
          <div>
            <label className="block font-semibold mb-1">Price (in BDT)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border border-green-700 bg-white/90 text-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter price"
            />
          </div>

         
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-green-700 bg-white/90 text-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Dhanmondi, Dhaka"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full border border-green-700 bg-white/90 text-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Paste image link"
            />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">User Name</label>
              <input
                type="text"
                value={user?.displayName || user?.name || "Unknown"}
                readOnly
                className="w-full border border-green-800 bg-gray-200 text-black px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">User Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full border border-green-800 bg-gray-200 text-black px-3 py-2 rounded-md"
              />
            </div>
          </div>

         
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md transition"
          >
            {loading ? "Adding..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
}
