import React, { useEffect, useState, useContext } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { AuthContext } from '../context/AuthContext';
import api from '../api'; // Axios instance

export default function MyRatings() {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchRatings = async () => {
      try {
        // 1️⃣ Get all reviews submitted by the logged-in user
        const { data: reviews } = await api.get('/my-ratings'); // JWT auto attach

        // 2️⃣ Fetch property details for each review
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
    return <p className="text-center mt-10 text-gray-300">Loading your ratings...</p>;
  if (!ratings.length)
    return (
      <p className="text-center mt-10 text-gray-400 text-lg">
        You have not rated any properties yet.
      </p>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-950 via-teal-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-400">
        My <span className="text-teal-300">Ratings & <span className="text-yellow-300">Reviews</span></span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ratings.map((r, idx) => (
          <div
            key={idx}
            className="bg-black/70 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            {r.propertyThumbnail && (
              <img
                src={r.propertyThumbnail}
                alt={r.propertyName}
                className="w-full h-52 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-green-400 mb-2">{r.propertyName}</h2>
              <Rating style={{ maxWidth: 120 }} value={r.rating} readOnly />
              <p className="text-gray-300 mt-2 italic">Comment: “{r.reviewText}”</p>
              <p className="text-sm text-blue-400 mt-2">Reviewed by: {user?.email}</p>
              <p className="text-sm text-yellow-400">
                Date: {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
