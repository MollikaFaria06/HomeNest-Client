import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { AuthContext } from '../context/AuthContext'; // assuming you have an AuthContext

export default function PropertyDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // Logged-in user
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch property details
  useEffect(() => {
    fetch(`http://localhost:5000/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching property details:', err);
        setLoading(false);
      });
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    fetch(`http://localhost:5000/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Error fetching reviews:', err));
  }, [id]);

  // Submit review
  const handleSubmitReview = async () => {
    if (!newReview || !user) return; // must have review text and user
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
          createdAt: new Date().toISOString(),
        }),
      });
      const data = await res.json();

      // Add new review to state
      setReviews(prev => [
        ...prev,
        {
          rating: newRating,
          reviewText: newReview,
          reviewerName: user.name,
          reviewerEmail: user.email,
          createdAt: new Date().toISOString(),
        },
      ]);
      setNewReview('');
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
      {/* Property Info */}
      <h1 className="text-3xl text-orange-700 font-bold mb-4">{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        className="w-96 h-96 object-cover mb-4 rounded-lg"
      />
      <p className="text-blue-700 mb-1 font-bold">Category: {property.type}</p>
      <p className="text-green-600 font-bold mb-1">
        <strong>Price:</strong> ${property.price.toLocaleString()}
      </p>
      <p className="text-yellow-600 mb-1">
        <strong>Location:</strong> {property.location}
      </p>
      <p className="text-pink-700 mb-1">
        <strong>Description:</strong> {property.description}
      </p>
      <p className="text-purple-500 mb-1">
        <strong>Posted on:</strong> {new Date(property.createdAt).toLocaleDateString()}
      </p>
      <div className="flex items-center mb-6">
        {property.owner?.photoURL && (
          <img
            src={property.owner.photoURL}
            alt={property.owner.name}
            className="w-10 h-10 rounded-full mr-2"
          />
        )}
        <div>
          <p className="text-red-800 font-medium mb-1">
            <strong>Posted by:</strong> {property.owner?.name}
          </p>
          <p className="text-blue-900 ">
            <strong>Owner Email:</strong> {property.owner?.email}
          </p>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>

        {/* Existing reviews */}
{reviews.length > 0 ? (
  reviews.map((r, idx) => (
    <div key={idx} className="mb-3 border-b border-gray-200 pb-2">
      <div className="flex items-center mb-1">
        <Rating style={{ maxWidth: 120 }} value={r.rating} readOnly />
        <span className="ml-2 text-sm text-gray-500">({r.rating})</span>
      </div>
      <p className="text-gray-700">{r.reviewText}</p>
      <p className="text-gray-500 text-sm">
        Reviewed by: {user?.name} ({user?.email})
      </p>
    </div>
  ))
) : (
  <p>No reviews yet.</p>
)}


        {/* Add a review */}
        <div className="mt-4">
          <h3 className="font-medium mb-2">Add Your Review</h3>
          <div className="flex items-center mb-2">
            <span className="mr-2">Your Rating:</span>
            <Rating style={{ maxWidth: 180 }} value={newRating} onChange={setNewRating} />
          </div>
          <textarea
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="border rounded px-2 py-1 w-full mb-2"
          ></textarea>
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
    </div>
  );
}
