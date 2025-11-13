import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

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
        console.error(err);
        setProperty(null);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmitReview = async () => {
    if (!newReview || !user) return Swal.fire('Login Required', 'Please login first.', 'warning');
    setSubmitting(true);
    try {
      await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: id,
          rating: newRating,
          reviewText: newReview,
          reviewerName: user.name || user.displayName,
          reviewerEmail: user.email,
        }),
      });
      Swal.fire('Success', 'Review submitted!', 'success');
      navigate('/my-ratings');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
     
      <div className="min-h-screen p-6 bg-gradient-to-br from-green-950 via-teal-900 to-black text-white">
        {loading ? (
          <p className="text-center mt-10 text-lg text-gray-300">Loading properties...</p>
        ) : !property ? (
          <p className="text-center mt-10 text-lg text-gray-300">Property not found.</p>
        ) : (
          <>
            <h1 className="text-3xl text-orange-700 font-bold mb-4">{property.title}</h1>
            <img
              src={property.image}
              alt={property.title}
              className="w-96 h-96 object-cover mb-4 rounded-lg"
            />
            <p className="text-blue-400 mb-1 font-bold">Category: {property.type}</p>
            <p className="text-red-400 font-bold mb-1">
              <strong>Price:</strong> ${property.price?.toLocaleString() || 'N/A'}
            </p>
            <p className="text-yellow-400 mb-1"><strong>Location:</strong> {property.location}</p>
            <p className="text-pink-400 mb-1"><strong>Description:</strong> {property.description}</p>
            <p className="text-purple-300 mb-1">
              <strong>Posted on:</strong> {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
            </p>
            <p className='text-orange-300'><strong>Posted by: </strong>{property.owner.name}</p>
            <p className='text-red-500'><strong>Owner Email: </strong>{property.owner.email}</p>

            <div className="bg-black/60 p-4 rounded-lg shadow-md mt-4">
              <h2 className="text-2xl text-green-400 font-bold mb-4">Add Your Reviews and Ratings</h2>
              <Rating style={{ maxWidth: 180 }} value={newRating} onChange={setNewRating} />
              <textarea
                placeholder="Write your review..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="border border-gray-400 rounded px-2 py-1 w-full my-2 bg-black/20 text-white placeholder-gray-300"
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
          </>
        )}
      </div>

    </>
  );
}
