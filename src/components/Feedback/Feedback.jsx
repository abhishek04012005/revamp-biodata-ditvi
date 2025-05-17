import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    rating: 0,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };

  const handleStarClick = (selectedRating) => {
    setFormData((prev) => ({
      ...prev,
      rating: selectedRating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setShowThankYou(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setShowThankYou(false);
        setMessage("Thank you for your valuable feedback!");
        setFormData({
          rating: 0,
          message: "",
        });
      }, 2000);
    }, 1500);
  };

  return (
    <section className="feedback-section">
      <div className="animated-circle circle-1"></div>
      <div className="animated-circle circle-2"></div>
      <div className="animated-circle circle-3"></div>

      <div className={`feedback-container ${showThankYou ? 'thank-you-active' : ''}`}>
        <div className="feedback-content">
          <h2 className="title-animation">How was your experience?</h2>
          <p className="subtitle-animation">Your feedback helps us improve our services</p>

          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="rating-container">
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={`star-icon ${formData.rating >= star ? 'active' : ''}`}
                  >
                    {star <= formData.rating ? (
                      <StarIcon className="filled pulse" />
                    ) : (
                      <StarBorderIcon className="empty" />
                    )}
                  </span>
                ))}
              </div>
              <p className={`rating-label ${formData.rating > 0 ? 'active' : ''}`}>
                {formData.rating === 0
                  ? "Select your rating"
                  : formData.rating === 5
                  ? "Excellent!"
                  : formData.rating === 4
                  ? "Very Good"
                  : formData.rating === 3
                  ? "Good"
                  : formData.rating === 2
                  ? "Fair"
                  : "Poor"}
              </p>
            </div>

            <div className="message-container">
              <textarea
                placeholder="Share your thoughts with us..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="animated-textarea"
              />
            </div>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting || formData.rating === 0}
            >
              <span className="btn-content">
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </span>
              <span className="btn-shine"></span>
            </button>

            {message && <div className="message success">{message}</div>}
          </form>
        </div>

        <div className="thank-you-screen">
          <div className="thank-you-content">
            <div className="check-mark">✓</div>
            <h3>Thank You!</h3>
            <p>Your feedback has been submitted successfully</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;