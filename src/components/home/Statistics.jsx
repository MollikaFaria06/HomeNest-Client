// src/components/home/Statistics.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Statistics() {
  const { theme } = useTheme();

  React.useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const stats = [
    { label: "Properties Listed", value: "1,245+" },
    { label: "Happy Clients", value: "3,560+" },
    { label: "Agents", value: "128+" },
    { label: "Cities Covered", value: "15+" },
  ];

  return (
    <section
      className={`py-20 px-6 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gradient-to-r from-green-900 via-teal-900 to-black text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-teal-300" data-aos="fade-up">
          Our Statistics
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mt-3" data-aos="fade-up" data-aos-delay="100">
          HomeNest has made a real impact in the real estate market. See the numbers for yourself.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 150}
            className={`p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center transition-transform transform hover:scale-105
              ${theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-700" : "bg-gradient-to-br from-green-600 via-teal-600 to-green-700"}
            `}
          >
            <h3 className="text-4xl font-extrabold text-yellow-400 mb-2">{s.value}</h3>
            <p className="text-gray-200 text-lg">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
