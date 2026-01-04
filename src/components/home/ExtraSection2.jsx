import React, { useEffect } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ExtraSection2() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email",
      });
      return;
    }

    Swal.fire({
      title: "Subscribed!",
      text: `You have successfully subscribed with ${email}`,
      icon: "success",
      confirmButtonColor: "#16a34a",
    });

    e.target.reset();
  };

  return (
    <section
      data-aos="fade-up"
      className="py-28 px-6 sm:px-12 md:px-20 bg-gradient-to-r from-green-800 via-teal-900 to-yellow-700 text-white rounded-xl shadow-lg"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            📬 Join the HomeNest Community
          </h2>
          <p className="text-gray-200 text-sm sm:text-base">
            Subscribe to receive new properties, offers, and expert tips directly
            in your inbox.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          data-aos="fade-left"
          data-aos-delay="100"
          className="flex w-full md:w-auto gap-3 mt-6 md:mt-0"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            className="input input-bordered w-full md:w-64 rounded-lg px-4 py-3 text-black focus:outline-none"
          />
          <button
            type="submit"
            className="btn bg-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
