import React, { useEffect } from "react";
import { FaHome, FaHandshake, FaDollarSign } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

export default function WhyChooseUs() {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true,    // animation occurs only once
      easing: "ease-in-out",
    });
  }, []);

  const reasons = [
    {
      icon: <FaHome className="text-green-400 text-4xl" />,
      title: "Verified Listings",
      desc: "We ensure every property listed is authentic and up to date.",
    },
    {
      icon: <FaHandshake className="text-green-400 text-4xl" />,
      title: "Trusted Agents",
      desc: "Work with licensed agents who prioritize your satisfaction.",
    },
    {
      icon: <FaDollarSign className="text-green-400 text-4xl" />,
      title: "Best Price Guarantee",
      desc: "We compare market prices to get you the best deal possible.",
    },
  ];

  return (
    <section
      className={`py-12 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-teal-900 via-green-900 to-green-800 text-white"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2
          className={`text-3xl font-bold mb-6 ${
            theme === "dark" ? "text-yellow-400" : "text-yellow-300"
          }`}
        >
          Why Choose{" "}
          <span className={theme === "dark" ? "text-green-400" : "text-green-400"}>
            HomeNest?
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              data-aos="fade-up" // AOS animation
              data-aos-delay={i * 100} // stagger animation
              className={`p-6 rounded-xl shadow-md transition hover:shadow-lg ${
                theme === "dark"
                  ? "bg-gray-800/60 backdrop-blur-sm"
                  : "bg-black/60 backdrop-blur-md"
              }`}
            >
              <div className="flex justify-center mb-4">{r.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{r.title}</h3>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-200"
                }`}
              >
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
