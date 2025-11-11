// src/components/home/WhyChooseUs.jsx
import React from "react";
import { FaHome, FaHandshake, FaDollarSign } from "react-icons/fa";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <FaHome className="text-green-600 text-4xl" />,
      title: "Verified Listings",
      desc: "We ensure every property listed is authentic and up to date.",
    },
    {
      icon: <FaHandshake className="text-green-600 text-4xl" />,
      title: "Trusted Agents",
      desc: "Work with licensed agents who prioritize your satisfaction.",
    },
    {
      icon: <FaDollarSign className="text-green-600 text-4xl" />,
      title: "Best Price Guarantee",
      desc: "We compare market prices to get you the best deal possible.",
    },
  ];

  return (
    <section className="bg-green-200 py-12">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-6">
          Why Choose <span className="text-green-600">HomeNest?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{r.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{r.title}</h3>
              <p className="text-sm text-gray-600">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
