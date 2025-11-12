import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { AuthContext } from '../context/AuthContext';

export default function PropertyDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch property details
  useEffect(() => {
    fetch(`http://localhost:5000/properties/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Property not found');
        return res.json();
      })
      .then(data => {
        setProperty(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching property details:', err);
        setProperty(null);
        setLoading(false);
      });
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    fetch(`http://localhost:5000/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error(err));
  }, [id]);

  // Submit review
  const handleSubmitReview = async () => {
    if (!newReview || !user) return;
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: id,
          rating: newRating,
          reviewText: newReview,
          reviewerName: user.name,
          reviewerEmail: user.email,
        }),
      });
      await res.json();

      // Redirect to MyRatings page after submit
      navigate('/my-ratings');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading property details...</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="p-6 bg-green-200 min-h-screen">
      <h1 className="text-3xl text-orange-700 font-bold mb-4">{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        className="w-96 h-96 object-cover mb-4 rounded-lg"
      />
      <p className="text-blue-700 mb-1 font-bold">Category: {property.type}</p>
      <p className="text-green-600 font-bold mb-1">
        <strong>Price:</strong> ${property.price?.toLocaleString() || 'N/A'}
      </p>
      <p className="text-yellow-600 mb-1"><strong>Location:</strong> {property.location}</p>
      <p className="text-pink-700 mb-1"><strong>Description:</strong> {property.description}</p>
      <p className="text-purple-500 mb-1">
        <strong>Posted on:</strong>{' '}
        {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
      </p>

      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold mb-4">Add Your Review</h2>
        <Rating style={{ maxWidth: 180 }} value={newRating} onChange={setNewRating} />
        <textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="border rounded px-2 py-1 w-full my-2"
        />
        <button
          onClick={handleSubmitReview}
          disabled={submitting || !user}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Review
        </button>
        {!user && <p className="text-red-500 mt-2">Please log in to submit a review.</p>}
      </div>
    </div>
  );
}
