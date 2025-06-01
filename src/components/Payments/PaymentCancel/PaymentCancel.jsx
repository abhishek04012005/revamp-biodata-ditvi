import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Cancel,
  ArrowBack,
  ErrorOutline,
  Refresh,
  Support,
  Person,
  Phone,
} from "@mui/icons-material";
import "./PaymentCancel.css";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestNumber, userDetails, modelDetails } = location.state || {};
  useEffect(() => {
    if (!requestNumber) {
      navigate(`/payment/${requestNumber}`);
    }
  }, [requestNumber, navigate]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleTryAgain = () => {
    navigate(`/payment/${requestNumber}`);
  };

  const handleSupport = () => {
    window.location.href = "mailto:support@ditvi.com";
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-header">
          <Cancel className="payment-header-icon" />
          <h2>Payment Cancelled</h2>
        </div>

        <div className="request-details">
          <div className="detail-section">
            <h1 className="payment-request-number">
              Request No: #{requestNumber}
            </h1>

            <div className="detail-grid">
              <div className="detail-item">
                <Person className="detail-icon" />
                <div className="detail-content">
                  <label>Full Name</label>
                  <p>{userDetails.name}</p>
                </div>
              </div>

              <div className="detail-item">
                <Phone className="detail-icon" />
                <div className="detail-content">
                  <label>Mobile Number</label>
                  <p>{userDetails.mobileNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="alert-message">
            <ErrorOutline className="alert-icon" />
            <p>
              Your payment was not processed and no amount has been deducted
              from your account.
            </p>
          </div>

          {/* <div className="info-section">
            <h3>What went wrong?</h3>
            <div className="info-grid">
              <div className="info-card">
                <WifiOff className="info-icon" />
                <h4>Connection Issue</h4>
                <p>
                  Check your internet connection and ensure stable connectivity
                </p>
              </div>

              <div className="info-card">
                <AccountBalance className="info-icon" />
                <h4>Payment Method</h4>
                <p>Verify your payment details and bank account balance</p>
              </div>
            </div>
          </div> */}

            <div className="amount-details">
                <span>Total Amount</span>
                <div className="amount">
                  <span>₹ </span>
                  {modelDetails.amount}
                </div>
              </div>

          <div className="action-buttons">
            <button className="primary-button" onClick={handleTryAgain}>
              <Refresh /> Try Payment Again
            </button>
            <button className="secondary-button" onClick={handleSupport}>
              <Support /> Contact Support
            </button>
            <button className="tertiary-button" onClick={handleGoBack}>
              <ArrowBack /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
