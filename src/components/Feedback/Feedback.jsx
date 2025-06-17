import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  StarBorder,
  RateReview,
  Person,
  Phone,
  ArrowBack,
  CheckCircle,
  ReportProblem,
  Favorite,
} from "@mui/icons-material";
import "./Feedback.css";
import { UserFeedbackStorage } from "../../supabase/UserFeedback";
import { BiodataRequestStorage } from "../../supabase/BiodataRequest";
import { getLatestStatusId } from "../../utils/StatusHelper";
import SupportPopup from "../SupportPopup/SupportPopup";
import Loader from "../../structure/Loader/Loader";
import { maskMobileNumber } from "../../utils/MobileNumberHelper";
import { ProductionRequestStorage } from "../../supabase/ProductionRequest";
import SEO from "../SEO/SEO";

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

  const seoData = {
    title: `Share Your Feedback - Request #${requestNumber} | Ditvi Biodata`,
    description:
      "Share your experience with Ditvi Biodata's marriage biodata creation service. Your feedback helps us improve our service quality.",
    keywords:
      "biodata feedback, customer review, Ditvi Biodata review, marriage biodata service feedback",
    ogImage: "/images/feedback-og.jpg",
    canonicalUrl: `https://biodata.ditvi.org/feedback/${requestNumber}`,
    noindex: true,
    schema: {
      "@context": "https://schema.org",
      "@type": "ReviewAction",
      target: {
        "@type": "Service",
        name: "Ditvi Biodata Creation",
        provider: {
          "@type": "Organization",
          name: "Ditvi Biodata",
          logo: {
            "@type": "ImageObject",
            url: "https://biodata.ditvi.org/images/logo.png",
          },
        },
      },
      agent: {
        "@type": "Person",
        name: requestDetails?.user_details?.name,
      },
      object: {
        "@type": "Product",
        name: "Marriage Biodata Creation Service",
        identifier: requestNumber,
        review: showThankYou
          ? {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: formData.rating,
                bestRating: "5",
                worstRating: "1",
              },
              author: {
                "@type": "Person",
                name: requestDetails?.user_details?.name,
              },
              reviewBody: formData.comment,
              datePublished: new Date().toISOString(),
            }
          : null,
      },
      potentialAction: {
        "@type": "ReviewAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `https://biodata.ditvi.org/feedback/${requestNumber}`,
        },
        actionStatus: showThankYou
          ? "CompletedActionStatus"
          : "ActiveActionStatus",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        name: "Customer Feedback Form",
        description: "Share your experience with our biodata creation service",
      },
    },
  };

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
    if (isFeedbackShared)
      return <CheckCircle className="payment-header-icon" />;
    if (isFeedbackEnabled)
      return <RateReview className="payment-header-icon" />;
    return <ReportProblem className="payment-header-icon" />;
  };

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
        setIsFeedbackShared(true);
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
    <>
      <SEO {...seoData} />
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
                        isSubmitting ||
                        formData.rating === 0 ||
                        !formData.comment
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
                  <div className="feedback-heart">
                    {[...Array(5)].map((_, index) => (
                      <Favorite
                        key={index}
                        style={{
                          animation: `fadeIn 1s ease-in ${
                            index * 0.5
                          }s infinite`,
                        }}
                      />
                    ))}
                  </div>

                  <h2
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "1.8rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                    }}
                  >
                    Thank You!
                  </h2>
                  <div className="feedback-success">
                    <CheckCircle
                      className="payment-header-icon"
                      style={{
                        color: "#4CAF50",
                        marginRight: "12px",
                        height: "25px",
                        width: "25px",
                        animation: "fadeIn 0.3s ease-in",
                      }}
                    />
                    <p
                      style={{
                        color: "#4CAF50",
                        fontWeight: 500,
                      }}
                    >
                      Your feedback has been submitted successfully.
                    </p>
                  </div>
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
    </>
  );
};

export default Feedback;
