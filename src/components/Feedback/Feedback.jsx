import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./Feedback.css";
import { UserFeedbackStorage } from "../../supabase/UserFeedback";
import HeaderSection from "../../structure/HeaderSection/HeaderSection";
import { BiodataRequestStorage } from "../../supabase/BiodataRequest";
import { getLatestStatusId } from "../../utils/StatusHelper";

const FeedbackNotActive = () => (
  <section className="feedback-section">
    <HeaderSection
      title="Feedback"
      subtitle="Your feedback is very important to us."
    />
    <div className="feedback-container">
      <div className="feedback-not-active">
        <h3>Feedback Not Available Yet</h3>
        <p>
          The feedback option will be available once your biodata request is
          fulfilled. Please wait until the request is complete.
        </p>
      </div>
    </div>
  </section>
);

const StarRating = ({ rating, onStarClick }) => {
  const getRatingText = (rating) => {
    switch (rating) {
      case 5:
        return "Excellent!";
      case 4:
        return "Very Good";
      case 3:
        return "Good";
      case 2:
        return "Fair";
      case 1:
        return "Poor";
      default:
        return "Select your rating";
    }
  };

  return (
    <div className="rating-container">
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => onStarClick(star)}
            className={`star-icon ${rating >= star ? "active" : ""}`}
          >
            {star <= rating ? (
              <StarIcon className="filled pulse" />
            ) : (
              <StarBorderIcon className="empty" />
            )}
          </span>
        ))}
      </div>
      <p className={`rating-label ${rating > 0 ? "active" : ""}`}>
        {getRatingText(rating)}
      </p>
    </div>
  );
};

const FeedbackForm = ({
  formData,
  isSubmitting,
  comment,
  handleSubmit,
  handleChange,
  handleStarClick,
}) => (
  <form onSubmit={handleSubmit} className="feedback-form">
    <StarRating rating={formData.rating} onStarClick={handleStarClick} />

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
      className={`submit-btn ${isSubmitting ? "loading" : ""}`}
      disabled={
        isSubmitting || formData.rating === 0 || formData.comment === ""
      }
    >
      <span className="btn-content">
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </span>
      <span className="btn-shine"></span>
    </button>

    {comment && <div className="message success">{comment}</div>}
  </form>
);

const ThankYouScreen = () => (
  <div className="thank-you-screen">
    <div className="thank-you-content">
      <div className="check-mark">✓</div>
      <h3>Thank You!</h3>
      <p>Your feedback has been submitted successfully</p>
    </div>
  </div>
);

const Feedback = () => {
  const { requestNumber } = useParams();
  const [formData, setFormData] = useState({ rating: 0, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [status, setStatus] = useState([]);

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

    BiodataRequestStorage.getBiodataRequestByRequestNumber(requestNumber).then(
      (response) => {
        if (response) {
          setStatus(response.status);
        }
      }
    );
  }, [requestNumber]);

  const isFeedbackEnabled = () => {
    if (!status) return false;
    const latestStatus = getLatestStatusId(status);
    return latestStatus === 5;
  };

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
        requestNumber,
        comment: formData.comment,
        rating: formData.rating,
      });

      const updateResponse =
        BiodataRequestStorage.updateStatusBiodataRequestFromFeedback(
          requestNumber,
          [
            ...status,
            {
              id: 6,
              created: new Date().toISOString(),
            },
          ]
        );

      if (response && updateResponse) {
        setComment("Feedback submitted successfully!");
        setShowThankYou(true);
      } else {
        setComment("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setComment("An error occurred while submitting feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isFeedbackEnabled()) {
    return <FeedbackNotActive />;
  }

  return (
    <section className="feedback-section">
      <HeaderSection
        title="Feedback"
        subtitle="Your feedback is very important to us. Please share your feedback."
      />

      <div className="animated-circle circle-1" />
      <div className="animated-circle circle-2" />
      <div className="animated-circle circle-3" />

      <div
        className={`feedback-container ${
          showThankYou ? "thank-you-active" : ""
        }`}
      >
        <div className="feedback-content">
          <h2 className="title-animation">How was your experience?</h2>
          <p className="subtitle-animation">
            Your feedback helps us improve our services
          </p>

          <FeedbackForm
            formData={formData}
            isSubmitting={isSubmitting}
            comment={comment}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleStarClick={handleStarClick}
          />
        </div>

        <ThankYouScreen />
      </div>
    </section>
  );
};

export default Feedback;
