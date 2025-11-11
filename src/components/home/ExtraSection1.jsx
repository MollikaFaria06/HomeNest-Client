import React from "react";

export default function ExtraSection1() {
  const testimonials = [
    {
      name: "Ayesha Rahman",
      comment:
        "HomeNest made finding my first apartment so easy! The agents were responsive and professional.",
      image:
        "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Tanvir Ahmed",
      comment:
        "Sold my property within a week thanks to HomeNest. Great platform for both buyers and sellers!",
      image:
        "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Rafiq Chowdhury",
      comment:
        "Loved the simple UI and transparent pricing. Highly recommend HomeNest to anyone in real estate.",
      image:
        "https://randomuser.me/api/portraits/men/21.jpg",
    },
  ];

  return (
    <section className="bg-yellow-200 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">
          What Our <span className="text-green-600">Clients Say</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-2 border-green-500"
                />
              </div>
              <p className="text-gray-600 italic mb-3">“{t.comment}”</p>
              <h3 className="font-semibold text-green-700">{t.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
