// src/pages/MyRatings.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function MyRatings() {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchRatings = async () => {
      try {
        const { data: reviews } = await api.get('/my-ratings');

        const ratingsWithProperty = await Promise.all(
          reviews.map(async (review) => {
            try {
              const { data: property } = await api.get(`/properties/${review.propertyId}`);
              return {
                ...review,
                propertyName: property.title || 'Unknown Property',
                propertyThumbnail: property.image || '',
              };
            } catch {
              return { ...review, propertyName: 'Unknown', propertyThumbnail: '' };
            }
          })
        );

        setRatings(ratingsWithProperty);
      } catch (err) {
        console.error('Error fetching ratings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [user]);

  if (loading)
    return (
      <div
        className={`p-6 min-h-screen flex flex-col items-center justify-center ${
          theme === 'dark'
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-green-950 via-teal-900 to-black'
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-400 border-b-4 border-transparent"></div>
        <p
          className={`text-xl mt-4 ${
            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-300'
          }`}
        >
          Loading your ratings...
        </p>
      </div>
    );

  if (!ratings.length)
    return (
      <div
        className={`p-6 min-h-screen flex items-center justify-center ${
          theme === 'dark'
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-green-950 via-teal-900 to-black'
        }`}
      >
        <p className={`text-xl ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-300'}`}>
          You have not rated any properties yet.
        </p>
      </div>
    );

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-green-950 via-teal-900 to-black text-white'
      }`}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-green-400">
        My <span className="text-teal-300">Ratings & <span className="text-yellow-300">Reviews</span></span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ratings.map((r, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 100} // stagger effect
            className={`p-4 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${
              theme === 'dark' ? 'bg-black/70 backdrop-blur-sm' : 'bg-black/70'
            }`}
          >
            {r.propertyThumbnail && (
              <img
                src={r.propertyThumbnail}
                alt={r.propertyName}
                className="w-full h-52 object-cover rounded-md"
              />
            )}
            <div className="mt-3">
              <h2 className="text-xl font-semibold text-green-400 mb-2">{r.propertyName}</h2>
              <Rating style={{ maxWidth: 120 }} value={r.rating} readOnly />
              <p className="text-gray-300 mt-2 italic">Comment: “{r.reviewText}”</p>
              <p className="text-yellow-500 mt-2 text-sm">Reviewed by: {user?.email}</p>
              <p className="text-yellow-400 text-sm mt-1">
                Date: {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
