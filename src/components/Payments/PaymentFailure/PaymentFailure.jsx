import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Error,
  Home,
  Refresh,
  ArrowBack,
  Tag,
  WifiOff,
  AccountBalance,
  Timer,
  Payment as PaymentIcon,
  ErrorOutline,
  Support
} from '@mui/icons-material';
import './PaymentFailure.css';
import HeaderSection from '../../../structure/HeaderSection/HeaderSection';

const PaymentFailure = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestNumber = searchParams.get('request_number');
  const errorMessage = searchParams.get('error') || 'Payment could not be processed';

  const handleSupport = () => {
    window.location.href = "mailto:support@ditvi.com";
  };

  return (
    <div className="payment-page">
      <HeaderSection
        title="Payment Failed"
        subtitle="We encountered an issue processing your payment"
      />

      <div className="payment-card">
        <div className="payment-header">
          <PaymentIcon className="payment-header-icon" />
          <h2>Payment Status</h2>
        </div>

        <div className="request-details">
          <div className="payment-status-section">
            <div className="status-icon-wrapper">
              <Error className="error-icon" />
            </div>
            <h2 className="status-title">Transaction Failed</h2>
            <div className="request-number">
              <Tag className="detail-icon" />
              Request Number: <span className="highlight">{requestNumber}</span>
            </div>
          </div>

          <div className="alert-message">
            <ErrorOutline className="alert-icon" />
            <p>{errorMessage}</p>
          </div>

          <div className="info-section">
            <h3>What went wrong?</h3>
            <div className="info-grid">
              <div className="info-card">
                <WifiOff className="info-icon" />
                <h4>Connection Issue</h4>
                <p>Check your internet connection and ensure stable connectivity</p>
              </div>

              <div className="info-card">
                <AccountBalance className="info-icon" />
                <h4>Payment Method</h4>
                <p>Verify your payment details and bank account balance</p>
              </div>

              <div className="info-card">
                <Timer className="info-icon" />
                <h4>Session Timeout</h4>
                <p>The payment session might have expired</p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link 
              to={`/payment/${requestNumber}`} 
              className="primary-button"
            >
              <Refresh /> Try Payment Again
            </Link>
            <button 
              className="secondary-button"
              onClick={handleSupport}
            >
              <Support /> Contact Support
            </button>
            <Link 
              to="/dashboard" 
              className="tertiary-button"
            >
              <ArrowBack /> Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;