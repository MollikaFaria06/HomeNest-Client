import React, { useEffect, useState, useContext } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { AuthContext } from '../context/AuthContext';

export default function MyRatings() {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/my-ratings?email=${user.email}`)
      .then(res => res.json())
      .then(async (data) => {
        const ratingsWithProperty = await Promise.all(
          data.map(async (review) => {
            try {
              const propertyRes = await fetch(`http://localhost:5000/properties/${review.propertyId}`);
              const property = await propertyRes.json();
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
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p>Loading your ratings...</p>;
  if (!ratings.length) return <p>You have not rated any properties yet.</p>;

  return (
    <div className="p-6 bg-yellow-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Ratings & Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ratings.map((r, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
            {r.propertyThumbnail && (
              <img
                src={r.propertyThumbnail}
                alt={r.propertyName}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-red-600 mb-1">{r.propertyName}</h2>
              <Rating style={{ maxWidth: 120 }} value={r.rating} readOnly />
              <p className="text-blue-700 mb-1">{r.reviewText}</p>
              <p className="text-green-500 text-sm mb-1">Reviewed by: {user?.email}</p>
              <p className="text-orange-700 text-sm">
                Date: {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
