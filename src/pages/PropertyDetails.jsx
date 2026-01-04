// src/pages/PropertyDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Swal from 'sweetalert2';
import api from '../api'; // Axios instance
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
  }, []);

  // Spinner component
  const Spinner = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div
        className={`w-16 h-16 border-4 border-t-green-500 border-b-green-500 rounded-full animate-spin ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        }`}
      ></div>
    </div>
  );

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/properties/${id}`);
        setProperty(data);
      } catch (err) {
        console.error(err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get(`/reviews/${id}`);
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!newReview || !user) {
      return Swal.fire('Login Required', 'Please login first.', 'warning');
    }

    setSubmitting(true);
    try {
      await api.post('/reviews', {
        propertyId: id,
        rating: newRating,
        reviewText: newReview,
        reviewerName: user.name || user.displayName,
        reviewerEmail: user.email,
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

  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors ${
          theme === 'dark'
            ? 'bg-gray-900 text-gray-100'
            : 'bg-gradient-to-br from-green-950 via-teal-900 to-black text-white'
        }`}
      >
        <Spinner />
      </div>
    );

  if (!property)
    return (
      <p
        className={`text-center mt-10 text-lg transition-colors ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-100'
        }`}
      >
        Property not found.
      </p>
    );

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-green-950 via-teal-900 to-black text-white'
      }`}
    >
      {/* Property Info */}
      <div
        data-aos="fade-up"
        className="max-w-4xl mx-auto bg-black/60 p-6 rounded-lg shadow-md transition-colors"
      >
        <h1 className="text-3xl text-green-500 font-bold mb-4">{property.title}</h1>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-96 object-cover mb-4 rounded-lg"
        />

        <p className="mb-1 text-yellow-500"><strong>Category:</strong> {property.type}</p>
        <p className="mb-1 text-yellow-500"><strong>Price:</strong> ${property.price?.toLocaleString() || 'N/A'}</p>
        <p className="mb-1 text-yellow-500"><strong>Location:</strong> {property.location}</p>
        <p className="mb-1 text-yellow-500"><strong>Description:</strong> {property.description}</p>
        <p className="mb-1 text-yellow-500"><strong>Posted on:</strong> {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}</p>
        <p className="mb-1 text-yellow-500"><strong>Posted by:</strong> {property.owner.name}</p>
        <p className="mb-1 text-yellow-500"><strong>Owner Email:</strong> {property.owner.email}</p>
      </div>

      {/* Review Section */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className={`max-w-4xl mx-auto p-4 rounded-lg shadow-md mt-6 transition-colors ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-black/60'
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Add Your Review & Rating</h2>
        <Rating style={{ maxWidth: 180 }} value={newRating} onChange={setNewRating} />
        <textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className={`border rounded px-2 py-1 w-full my-2 transition-colors ${
            theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-400 bg-black/20 text-white placeholder-gray-300'
          }`}
        />
        <button
          onClick={handleSubmitReview}
          disabled={submitting || !user}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
        {!user && <p className="text-red-500 mt-2">Please log in to submit a review.</p>}
      </div>

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="max-w-4xl mx-auto mt-6">
          <h3 className="text-2xl font-bold mb-4">Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className={`p-4 rounded-lg shadow-md transition-colors ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-black/60'
                }`}
              >
                <h4 className="text-lg font-semibold">{r.reviewerName}</h4>
                <Rating style={{ maxWidth: 120 }} value={r.rating} readOnly />
                <p className="mt-1 italic">{r.reviewText}</p>
                <p className="text-sm mt-1">Date: {new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
