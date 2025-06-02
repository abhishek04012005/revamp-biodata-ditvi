import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  StarBorder,
  RateReview,
  Person,
  Phone,
  ArrowBack,
  CheckCircle
} from "@mui/icons-material";
import "./Feedback.css";
import { UserFeedbackStorage } from "../../supabase/UserFeedback";
import { BiodataRequestStorage } from "../../supabase/BiodataRequest";
import { getLatestStatusId } from "../../utils/StatusHelper";
import SupportPopup from "../SupportPopup/SupportPopup";
import Loader from "../../structure/Loader/Loader";
import { maskMobileNumber } from "../../utils/MobileNumberHelper";
import { ProductionRequestStorage } from "../../supabase/ProductionRequest";

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
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [isFeedbackEnabled, setIsFeedbackEnabled] = useState(false);
  const [isFeedbackShared, setIsFeedbackShared] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const feedback = await UserFeedbackStorage.getUserFeedback(
          requestNumber
        );
        const request =
          await BiodataRequestStorage.getBiodataRequestByRequestNumber(
            requestNumber
          );

        if (request) {
          setRequestDetails(request);
          const latestStatus = getLatestStatusId(request.status);
          setIsFeedbackEnabled(latestStatus === 5);
          setIsFeedbackShared(latestStatus === 6 || feedback !== null);
        }

        if (feedback) {
          setShowThankYou(true);
          setFormData({
            rating: feedback.rating,
            comment: feedback.comment,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
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

  const getFeedbackTitle = () => {
    if (isFeedbackShared) return "Thanks for your Feedback";
    if (isFeedbackEnabled) return "Share Your Feedback";
    return "Feedback link is inactive";
  };

  const getFeedbackIcons = () => {
    if (isFeedbackShared) return <CheckCircle className="payment-header-icon" />;
    if (isFeedbackEnabled) return <RateReview className="payment-header-icon" />;
    return <RateReview className="payment-header-icon" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const responseFeedback = await UserFeedbackStorage.saveUserFeedback({
        requestNumber,
        ...formData,
      });

      const responseBiodata =
        await BiodataRequestStorage.updateStatusBiodataRequestByRequestNumber(
          requestNumber,
          [
            ...requestDetails.status,
            {
              id: 6,
              created: new Date().toISOString(),
            },
          ],
          true
        );

      const responseProd =
        await ProductionRequestStorage.updateProductionRequestByRequestNumber(
          requestNumber,
          {
            completed: true,
          }
        );

      if (responseFeedback && responseBiodata && responseProd) {
        setShowThankYou(true);
      } else {
        setComment("An error occurred. Please try again.");
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
          {getFeedbackIcons()}
          <h2>{getFeedbackTitle()}</h2>
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
                  <label>Full Name</label>
                  <p>{requestDetails?.user_details.name}</p>
                </div>
              </div>

              <div className="detail-item">
                <Phone className="detail-icon" />
                <div className="detail-content">
                  <label>Whatapp Number</label>
                  <p>
                    {maskMobileNumber(
                      requestDetails?.user_details.mobileNumber
                    )}
                  </p>
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
                <p
                  style={{
                    color: "#4CAF50",
                    fontWeight: 500,
                  }}
                >
                  Your feedback has been submitted successfully.
                </p>
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
      {isLoading && <Loader />}
    </div>
  );
};

export default Feedback;
