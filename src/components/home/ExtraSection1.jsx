import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext"; // Import ThemeContext
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles

export default function ExtraSection1() {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true,    // animate only once
      easing: "ease-in-out",
    });
  }, []);

  const testimonials = [
    {
      name: "Ayesha Rahman",
      comment:
        "HomeNest made finding my first apartment so easy! The agents were responsive and professional.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Tanvir Ahmed",
      comment:
        "Sold my property within a week thanks to HomeNest. Great platform for both buyers and sellers!",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Rafiq Chowdhury",
      comment:
        "Loved the simple UI and transparent pricing. Highly recommend HomeNest to anyone in real estate.",
      image: "https://randomuser.me/api/portraits/men/21.jpg",
    },
  ];

  return (
    <section
      className={`py-16 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-yellow-600 via-teal-800 to-green-900 text-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2
          className={`text-3xl font-bold mb-8 ${
            theme === "dark" ? "text-yellow-400" : "text-yellow-300"
          }`}
        >
          What Our{" "}
          <span className={theme === "dark" ? "text-green-400" : "text-green-400"}>
            Clients Say
          </span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100} // stagger animation
              className={`p-6 rounded-xl shadow-lg transition hover:shadow-xl ${
                theme === "dark"
                  ? "bg-gray-800/60 backdrop-blur-sm"
                  : "bg-black/60 backdrop-blur-md"
              }`}
            >
              <div className="flex justify-center mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className={`w-16 h-16 rounded-full border-2 ${
                    theme === "dark" ? "border-green-500" : "border-green-400"
                  }`}
                />
              </div>
              <p
                className={`mb-3 italic ${
                  theme === "dark" ? "text-gray-300" : "text-gray-200"
                }`}
              >
                “{t.comment}”
              </p>
              <h3
                className={`font-semibold ${
                  theme === "dark" ? "text-green-400" : "text-green-300"
                }`}
              >
                {t.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
