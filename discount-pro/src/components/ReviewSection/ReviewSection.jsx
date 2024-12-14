import React, { useState } from "react";
import { toast } from "react-toastify";
const ReviewSection = ({ dealId, initialReviews = [] }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0 || !reviewText) {
      toast.error("Please provide a rating and review.");
      return;
    }

    const newReview = {
      rating,
      text: reviewText,
      date: new Date().toLocaleDateString(),
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
    setRating(0);
    setReviewText("");
    toast.success("Review submitted successfully!");
  };

  // Safe average rating calculation, ensures 'reviews' is always an array
  const averageRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;

  return (
    <section className="bg-gray-100 py-12 mb-5 rounded-xl">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Reviews
        </h2>

        {/* Review Input */}
        <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Leave a Review
          </h3>
          <form onSubmit={handleSubmitReview}>
            <div className="flex items-center mb-4">
              <span className="mr-2">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              rows="4"
              placeholder="Write your review here"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Display Reviews */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            User Reviews
          </h3>
          <div className="flex items-center mb-4">
            <span className="mr-2 text-yellow-500">
              ★ {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-500">Average Rating</span>
          </div>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="border-b py-4">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★ {review.rating}</span>
                  <span className="ml-2 text-gray-700">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
