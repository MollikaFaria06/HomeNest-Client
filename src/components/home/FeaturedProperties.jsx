import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../PropertyCard";
import Spinner from "../Spinner";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/properties")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProperties(sorted.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <Spinner />;

  return (
    <section className="max-w-full bg-gradient-to-br from-green-950 via-teal-900 to-black mx-auto px-4 py-12 text-white">
      <h2 className="text-3xl text-yellow-400 font-bold text-center mb-8">
        Featured <span className="text-green-400">Properties</span>
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p._id} property={p} />
        ))}
      </div>
    </section>
  );
}
