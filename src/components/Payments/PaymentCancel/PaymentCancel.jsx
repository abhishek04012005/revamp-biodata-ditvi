import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Cancel,
  ArrowBack,
  ErrorOutline,
  Refresh,
  Support,
  Numbers,
  WifiOff,
  AccountBalance,
  Timer
} from "@mui/icons-material";
import "./PaymentCancel.css";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestNumber = searchParams.get("request_number");

  useEffect(() => {
    if (!requestNumber) {
      navigate("/dashboard");
    }
  }, [requestNumber, navigate]);

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleTryAgain = () => {
    navigate(`/payment?request_number=${requestNumber}`);
  };

  const handleSupport = () => {
    window.location.href = "mailto:support@ditvi.com";
  };

  return (
    <div className="ditvi-payment-cancel-wrapper">
      <div className="ditvi-payment-cancel-container">
        <div className="ditvi-payment-cancel-status-icon">
          <Cancel className="ditvi-cancel-icon" />
        </div>

        <div className="ditvi-payment-cancel-header">
          <h1 className="ditvi-payment-cancel-title">Payment Cancelled</h1>
          <div className="ditvi-payment-request-number">
            <Numbers className="ditvi-request-icon" />
            Request Number: <span className="ditvi-request-value">{requestNumber}</span>
          </div>
        </div>

        <div className="ditvi-payment-cancel-alert">
          <ErrorOutline className="ditvi-alert-icon" />
          <p className="ditvi-alert-message">
            Your payment was not processed and no amount has been deducted from your account.
          </p>
        </div>

        <div className="ditvi-payment-cancel-info">
          <h2 className="ditvi-info-title">What went wrong?</h2>
          <div className="ditvi-info-grid">
            <div className="ditvi-info-card">
              <div className="ditvi-info-card-icon">
                <WifiOff className="ditvi-connection-icon" />
              </div>
              <h3 className="ditvi-info-card-title">Connection Issue</h3>
              <p className="ditvi-info-card-text">
                Check your internet connection and ensure stable connectivity
              </p>
            </div>
            <div className="ditvi-info-card">
              <div className="ditvi-info-card-icon">
                <AccountBalance className="ditvi-payment-icon" />
              </div>
              <h3 className="ditvi-info-card-title">Payment Method</h3>
              <p className="ditvi-info-card-text">
                Verify your payment details and bank account balance
              </p>
            </div>
            <div className="ditvi-info-card">
              <div className="ditvi-info-card-icon">
                <Timer className="ditvi-timeout-icon" />
              </div>
              <h3 className="ditvi-info-card-title">Session Timeout</h3>
              <p className="ditvi-info-card-text">
                The payment session might have expired
              </p>
            </div>
          </div>
        </div>

        <div className="ditvi-payment-actions">
          <button 
            className="ditvi-action-button ditvi-retry-button"
            onClick={handleTryAgain}
          >
            <Refresh className="ditvi-button-icon" /> Try Payment Again
          </button>
          <button 
            className="ditvi-action-button ditvi-support-button"
            onClick={handleSupport}
          >
            <Support className="ditvi-button-icon" /> Contact Support
          </button>
          <button 
            className="ditvi-action-button ditvi-back-button"
            onClick={handleGoBack}
          >
            <ArrowBack className="ditvi-button-icon" /> Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;