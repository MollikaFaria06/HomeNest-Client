// src/components/home/Support.jsx
import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaPhoneAlt, FaEnvelope, FaHeadset } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Support() {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const supportItems = [
    {
      id: 1,
      icon: <FaPhoneAlt size={36} className="text-green-400" />,
      title: "Call Us",
      description: "Reach us directly at +880 1306518217 for instant support.",
    },
    {
      id: 2,
      icon: <FaEnvelope size={36} className="text-green-400" />,
      title: "Email Support",
      description: "Send us an email at support@homenest.com and we’ll reply within 24h.",
    },
    {
      id: 3,
      icon: <FaHeadset size={36} className="text-green-400" />,
      title: "Live Chat",
      description: "Chat with our support team live for real-time assistance.",
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
          Help & <span className="text-teal-300">Support</span>
        </h2>
        <p
          className="text-gray-300 max-w-2xl mx-auto mt-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Need assistance? Our support team is here to help you anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {supportItems.map((item, idx) => (
          <div
            key={item.id}
            data-aos="fade-up"
            data-aos-delay={idx * 150}
            className={`p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center transition-transform transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800" : "bg-black/70"
            }`}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-green-400 mb-2">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
