import React from "react";

export default function ExtraSection2() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-yellow-500 py-16  text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the HomeNest Community</h2>
        <p className="mb-6 text-lg">
          Subscribe to get the latest property updates, offers, and expert tips
          directly in your inbox.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row justify-center items-center gap-3"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-full sm:w-2/3 rounded-lg text-black focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
