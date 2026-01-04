import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "How do I list my property on HomeNest?",
    answer:
      "You can list your property by creating an account and navigating to the 'Add Property' section. Fill out the details and submit for review.",
  },
  {
    question: "Is HomeNest free to use?",
    answer:
      "Yes! Browsing and searching properties is completely free. Listing a property may have optional premium features.",
  },
  {
    question: "Can I trust the property listings?",
    answer:
      "All listings are verified by our team to ensure authenticity. You can also read reviews from previous clients.",
  },
  {
    question: "How can I contact a property owner?",
    answer:
      "You can contact the property owner directly from the property details page via the provided email or phone number.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "Click on the 'Forgot Password' link on the login page and follow the instructions to reset your password.",
  },
];

export default function FAQ() {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`py-16 px-5 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-green-950 via-teal-900 to-black text-white"
      }`}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className={`text-3xl font-bold mb-10 ${
            theme === "dark" ? "text-yellow-400" : "text-yellow-300"
          }`}
          data-aos="fade-up"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-xl p-4 transition-colors ${
                theme === "dark" ? "border-gray-700 bg-gray-800/60" : "border-green-500 bg-black/50"
              }`}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center font-semibold text-left"
              >
                {faq.question}
                {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === idx && (
                <p className="mt-3 text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
