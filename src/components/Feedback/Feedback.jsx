import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./Feedback.css";
import { UserFeedbackStorage } from "../../supabase/UserFeedback";
import HeaderSection from "../../structure/HeaderSection/HeaderSection";

const Feedback = () => {
  const { requestNumber } = useParams();
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    UserFeedbackStorage.getUserFeedback(requestNumber)
      .then((response) => {
        if (response) {
          setShowThankYou(true);
          setComment("Feedback already submitted");
          setFormData({
            rating: response.rating,
            comment: response.comment,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching user feedback:", error);
      });
  },[requestNumber]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      comment: e.target.value,
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

    try {
      const response = await UserFeedbackStorage.saveUserFeedback({
        requestNumber: requestNumber,
        comment: formData.comment,
        rating: formData.rating,
      });
      if (response) {
        setComment("Feedback submitted successfully!");
        setShowThankYou(true);
      } else {
        setComment("Failed to submit feedback.");
      }
    }
    catch (error) {
      console.error("Error submitting feedback:", error);
      setComment("An error occurred while submitting feedback.");
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="feedback-section">
      <HeaderSection title="Feedback" subtitle="Your feedback is very important to us. Please share your feedback."></HeaderSection>
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
                value={formData.comment}
                onChange={handleChange}
                rows="4"
                className="animated-textarea"
              />
            </div>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting || formData.rating === 0 || formData.comment === ""}
            >
              <span className="btn-content">
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </span>
              <span className="btn-shine"></span>
            </button>

            {comment && <div className="message success">{comment}</div>}
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