import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PaymentFailure.css';
import { Error, Home, Refresh, ArrowBack } from '@mui/icons-material';
import HeaderSection from '../../../structure/HeaderSection/HeaderSection';

const PaymentFailure = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestNumber = searchParams.get('request_number');
  const errorMessage = searchParams.get('error') || 'Payment could not be processed';

  return (
    <div className="payment-failure">
      <HeaderSection
        title="Payment Failed"
        subtitle="We encountered an issue processing your payment"
      />

      <div className="failure-card">
        <div className="failure-icon-container">
          <Error className="failure-icon" />
        </div>

        <div className="failure-content">
          <h2>Transaction Failed</h2>
          <p className="failure-message">{errorMessage}</p>
          {requestNumber && (
            <p className="request-number">Request Number: {requestNumber}</p>
          )}

          <div className="failure-details">
            <h3>What happened?</h3>
            <ul>
              <li>The transaction was declined by your bank</li>
              <li>There might be an issue with your payment method</li>
              <li>The payment session might have timed out</li>
            </ul>
          </div>

          <div className="failure-actions">
            <Link 
              to={`/payment/${requestNumber}`} 
              className="retry-payment-btn"
            >
              <Refresh /> Try Again
            </Link>
            <Link 
              to={`/status/${requestNumber}`} 
              className="check-status-btn"
            >
              <ArrowBack /> Back to Status
            </Link>
            <Link 
              to="/" 
              className="home-btn"
            >
              <Home /> Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;