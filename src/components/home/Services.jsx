// src/components/home/Services.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaSearch,  FaRegLightbulb, FaDollarSign, FaClock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Services() {
  const { theme } = useTheme();

  React.useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    {
      icon: <FaSearch size={40} className="text-green-400" />,
      title: "Smart Search",
      description: "Find your ideal property easily using filters like price, location, and type.",
    },
    {
      icon: <FaDollarSign size={36} className="text-green-400" />,
      title: "Best Deals",
      description: "Get competitive pricing and find the perfect property within your budget.",
    },
    {
      icon: <FaClock size={36} className="text-green-400" />,
      title: "24/7 Support",
      description: "Our team is always available to help you with any queries or concerns.",
    },
    {
      icon: <FaRegLightbulb size={40} className="text-green-400" />,
      title: "Expert Advice",
      description: "Get tips and insights from real estate experts to make informed decisions.",
    },
  ];

  return (
    <section
      className={`py-20 px-6 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-green-950 via-teal-900 to-black text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2
          className="text-4xl font-extrabold text-green-400"
          data-aos="fade-up"
        >
          Our <span className="text-teal-300">Services</span>
        </h2>
        <p
          className="text-gray-300 max-w-2xl mx-auto mt-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          We provide comprehensive real estate services to help you find, buy, or sell properties efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 150}
            className={`p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center transition-transform transform hover:scale-105 ${
              theme === "dark"
                ? "bg-gray-800"
                : "bg-black/70"
            }`}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-green-400 mb-2">{service.title}</h3>
            <p className="text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
