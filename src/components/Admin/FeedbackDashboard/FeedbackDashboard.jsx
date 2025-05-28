import React, { useState, useEffect } from "react";
import {
  Dashboard,
  Star,
  ThumbUp,
  Message,
  Search,
  Delete,
  Visibility,
  Close,
} from "@mui/icons-material";
import "./FeedbackDashboard.css";
import { UserFeedbackStorage } from "../../../supabase/UserFeedback";
import formatDate from "../../../utils/DateHelper";
import Loader from "../../../structure/Loader/Loader";

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);


  const stats = [
    {
      icon: <Dashboard />,
      title: "Total Feedback",
      value: feedbacks.length,
      color: "#4CAF50",
    },
    {
      icon: <Star />,
      title: "Average Rating",
      value: calculateAverageRating(),
      color: "#FFC107",
    },
    {
      icon: <ThumbUp />,
      title: "Positive Reviews",
      value: countPositiveReviews(),
      color: "#2196F3",
    },
    {
      icon: <Message />,
      title: "New Feedback",
      value: countNewFeedback(),
      color: "#9C27B0",
    },
  ];

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  function calculateAverageRating() {
    if (feedbacks.length === 0) return "0.0";
    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return (total / feedbacks.length).toFixed(1);
  }

  function countPositiveReviews() {
    return feedbacks.filter((feedback) => feedback.rating >= 4).length;
  }

  function countNewFeedback() {
    const today = new Date();
    const threeDaysAgo = new Date(today.setDate(today.getDate() - 3));
    return feedbacks.filter(
      (feedback) => new Date(feedback.created_at) > threeDaysAgo
    ).length;
  }

  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      const response = await UserFeedbackStorage.getAllFeedback();
      if (response) {
        setFeedbacks(response);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <>
      <div className="feedback-dashboard">
        <div className="feedback-dashboard-content">
          <div className="feedback-dashboard-stats">
            {stats.map((stat, index) => (
              <div className="feedback-dashboard-stat-card" key={index}>
                <div
                  className="feedback-dashboard-stat-icon"
                >
                  {stat.icon}
                </div>
                <div className="feedback-dashboard-stat-info">
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="feedback-dashboard-table-section">
            <div className="feedback-dashboard-table-header">
              <h2>Feedback History</h2>
              <div className="feedback-dashboard-search-bar">
                <Search />
                <input
                  type="text"
                  placeholder="Search by name or feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="feedback-dashboard-table-wrapper">
              <table className="feedback-dashboard-table">
                <thead>
                  <tr>
                    <th>Request No.</th>
                    <th>Rating</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr key={feedback.id}>
                      <td>{feedback.request_number}</td>
                      <td>
                        <div className="rating-stars">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={
                                index < feedback.rating ? "filled" : ""
                              }
                            />
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="feedback-preview">
                          {feedback.comment}
                        </div>
                      </td>
                      <td>{formatDate(feedback.created_at)}</td>
                      <td>
                        <button
                          className="feedback-dashboard-view-btn"
                          onClick={() => setSelectedFeedback(feedback)}
                          title="View Details"
                        >
                          <Visibility />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Details Modal */}
      {selectedFeedback && (
        <div
          className="feedback-dashboard-modal-overlay"
          onClick={() => setSelectedFeedback(null)}
        >
          <div
            className="feedback-dashboard-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="feedback-dashboard-modal-header">
              <h2>Feedback Details</h2>
              <button
                className="feedback-dashboard-modal-close"
                onClick={() => setSelectedFeedback(null)}
              >
                <Close />
              </button>
            </div>
            <div className="feedback-dashboard-modal-content">
              <div className="feedback-detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{selectedFeedback.name}</span>
              </div>
              <div className="feedback-detail-row">
                <span className="detail-label">Rating:</span>
                <div className="rating-stars">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={
                        index < selectedFeedback.rating ? "filled" : ""
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="feedback-detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">
                  {formatDate(selectedFeedback.created_at)}
                </span>
              </div>
              <div className="feedback-detail-row message">
                <span className="detail-label">Message:</span>
                <p className="detail-value message-text">
                  {selectedFeedback.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

   
      {isLoading && <Loader />}
    </>
  );
};

export default FeedbackDashboard;
