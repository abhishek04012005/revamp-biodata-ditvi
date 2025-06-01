import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  StarBorder,
  RateReview,
  Person,
  AccessTime,
  Support,
  ArrowBack,
} from "@mui/icons-material";
import "./Feedback.css";
import { UserFeedbackStorage } from "../../supabase/UserFeedback";
import { BiodataRequestStorage } from "../../supabase/BiodataRequest";
import { getLatestStatusId } from "../../utils/StatusHelper";
import SupportPopup from "../SupportPopup/SupportPopup";

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
              <Star className="filled pulse" />
            ) : (
              <StarBorder className="empty" />
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

const Feedback = () => {
  const { requestNumber } = useParams();
  const navigate = useNavigate();
  const [showSupport, setShowSupport] = useState(false);
  const [formData, setFormData] = useState({ rating: 0, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [isFeedbackEnabled, setIsFeedbackEnabled] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedback = await UserFeedbackStorage.getUserFeedback(
          requestNumber
        );
        const request =
          await BiodataRequestStorage.getBiodataRequestByRequestNumber(
            requestNumber
          );

        if (feedback) {
          setShowThankYou(true);
          setFormData({
            rating: feedback.rating,
            comment: feedback.comment,
          });
        }

        if (request) {
          setRequestDetails(request);
          setIsFeedbackEnabled(getLatestStatusId(request.status) === 5);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [requestNumber]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleStarClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await UserFeedbackStorage.saveUserFeedback({
        requestNumber,
        ...formData,
      });

      if (response) {
        setShowThankYou(true);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setComment("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-header">
          <RateReview className="payment-header-icon" />
          <h2>
            {isFeedbackEnabled
              ? "Share Your Feedback"
              : "Feedback link is Not Available"}
          </h2>
        </div>

        <div className="request-details">
          <div className="detail-section">
            <h1 className="payment-request-number">
              Request No. #{requestNumber}
            </h1>

            <div className="detail-grid">
              <div className="detail-item">
                <Person className="detail-icon" />
                <div className="detail-content">
                  <label>Request Status</label>
                  <p>{isFeedbackEnabled ? "Ready for Feedback" : "Pending"}</p>
                </div>
              </div>

              <div className="detail-item">
                <AccessTime className="detail-icon" />
                <div className="detail-content">
                  <label>Request Date</label>
                  <p>{requestDetails?.created_at}</p>
                </div>
              </div>
            </div>
          </div>

          {!showThankYou ? (
            <form onSubmit={handleSubmit} className="feedback-form-new">
              <div className="rating-section">
                <h3>How was your experience?</h3>
                <StarRating
                  rating={formData.rating}
                  onStarClick={handleStarClick}
                />
              </div>

              <div className="comment-section">
                <textarea
                  placeholder="Share your thoughts with us..."
                  value={formData.comment}
                  onChange={handleChange}
                  className="feedback-textarea"
                  rows="4"
                />
              </div>

              <div className="action-buttons">
                {isFeedbackEnabled ? (
                  <button
                    type="submit"
                    className="primary-button"
                    disabled={
                      isSubmitting || formData.rating === 0 || !formData.comment
                    }
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                ) : (
                  <button type="button" className="primary-button disabled">
                    Feedback link is Inactive now. Please wait for admin
                    approval.
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="thank-you-section">
              <div className="success-message">
                <div className="check-mark">✓</div>
                <h3>Thank You!</h3>
                <p>Your feedback has been submitted successfully</p>
              </div>
              <div className="action-buttons">
                <button className="tertiary-button" onClick={handleGoBack}>
                  <ArrowBack /> Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
    </div>
  );
};

export default Feedback;
