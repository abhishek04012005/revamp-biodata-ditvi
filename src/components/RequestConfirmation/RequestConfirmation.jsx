import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Check,
  WhatsApp,
  TrackChanges,
  Style,
  CurrencyRupee,
  Language,
  Category,
  Badge,
  ConfirmationNumber,
} from "@mui/icons-material";
import "./RequestConfirmation.css";
import Container from "../../structure/Container/Container";

const RequestConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Check if required data exists
    if (
      !location.state?.requestNumber ||
      !location.state?.userDetails ||
      !location.state?.modelDetails
    ) {
      navigate("/");
      return;
    }

    setData(location.state);

    // Disable back button navigation
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventBack);

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }, [location.state, navigate]);

  // Return loading or redirect if no data
  if (!data) {
    return null;
  }

  const { requestNumber, userDetails, modelDetails } = data;

  return (
    <section className="confirmation-page">
      <Container>
        <div className="confirmation-content">
          <div className="confirmation-card">
            <div className="success-icon-wrapper">
              <Check className="success-icon" />
            </div>

            <h1>Thank You!</h1>
            <p className="success-message">
              Your biodata request has been successfully received.
            </p>

            <div className="request-number-title">
              <div className="request-number-wrapper">
                <ConfirmationNumber className="request-number-icon" />
                <div className="request-number-content">
                  <span className="request-number-label">Request Number</span>
                  <span className="request-number-value">{requestNumber}</span>
                </div>
              </div>
            </div>

            <div className="confirmation-details">
              <div className="detail-item">
                <span className="detail-label">
                  <span className="detail-icon-wrapper">
                    <Badge className="detail-icon" />
                    Name
                  </span>
                </span>
                <span className="detail-value">{userDetails.name}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <span className="detail-icon-wrapper">
                    <WhatsApp className="detail-icon" />
                    Whatsapp Number
                  </span>
                </span>
                <span className="detail-value">{userDetails.mobileNumber}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <span className="detail-icon-wrapper">
                    <Style className="detail-icon" />
                    Model Number
                  </span>
                </span>
                <span className="detail-value">{modelDetails.modelNumber}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <span className="detail-icon-wrapper">
                    <CurrencyRupee className="detail-icon" />
                    Amount
                  </span>
                </span>
                <span className="detail-value">{modelDetails.amount}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <span className="detail-icon-wrapper">
                    <Category className="detail-icon" />
                    Type
                  </span>
                </span>
                <span className="detail-value">{modelDetails.type}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <span className="detail-icon-wrapper">
                    <Language className="detail-icon" />
                    Language
                  </span>
                </span>
                <span className="detail-value">{modelDetails.language}</span>
              </div>
            </div>

            <div className="confirmation-actions">
              <button
                className="action-button track-status"
                onClick={() => navigate(`/track-status/${requestNumber}`)}
              >
                <TrackChanges />
                Track Status
              </button>
              <button
                className="action-button connect"
                onClick={() =>
                  window.open("https://wa.me/919263767441", "_blank")
                }
              >
                <WhatsApp />
                Connect with Us
              </button>
            </div>

            <div className="additional-info">
              <p>
                Save your <strong>Request Number</strong> for future reference
                and communication.
              </p>
              <p className="contact-info">
                For any queries, contact us on WhatsApp
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RequestConfirmation;
