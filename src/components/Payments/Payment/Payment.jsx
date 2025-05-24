import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Payment.css';
import {
  ErrorOutline,
  CheckCircle,
  Payment as PaymentIcon,
  Person,
  Email,
  Phone,
  AccessTime,
  SearchOff,
  Home,
} from '@mui/icons-material';
import HeaderSection from '../../structure/HeaderSection/HeaderSection';
import { BiodataRequestStorage } from '../../supabase/BiodataRequest';
import { getLatestStatusId } from '../../utils/StatusHelper';
import formatDate from '../../utils/DateHelper';

const Payment = () => {
  const { requestNumber } = useParams();
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequestDetails();
  }, [requestNumber]);

  const fetchRequestDetails = async () => {
    try {
      setLoading(true);
      const response = await BiodataRequestStorage.getBiodataRequestByRequestNumber(requestNumber);
      if (response) {
        setRequestData(response);
      } else {
        setError('Invalid request number');
      }
    } catch (err) {
      setError('Error fetching request details');
    } finally {
      setLoading(false);
    }
  };

  const isPaymentEnabled = () => {
    if (!requestData) return false;
    const latestStatus = getLatestStatusId(requestData.status);
    return latestStatus === 2; // User Approved status
  };

  const isPaymentCompleted = () => {
    if (!requestData) return false;
    const latestStatus = getLatestStatusId(requestData.status);
    return latestStatus > 2; // Payment completed
  };

  if (loading) {
    return <div className="payment-loader">Loading...</div>;
  }

  if (error || !requestData) {
    return (
      <div className="payment-page">
        <HeaderSection
          title="Make Payment"
          subtitle="Complete your payment to proceed with biodata creation"
        />
        <div className="payment-error-card">
          <div className="error-header">
            <ErrorOutline className="error-icon" />
            <h2>Invalid Request</h2>
          </div>
          <div className="error-content">
            <SearchOff className="error-illustration" />
            <p>{error || 'Request not found'}</p>
            <Link to="/" className="error-action-btn">
              <Home /> Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isPaymentCompleted()) {
    return (
      <div className="payment-page">
        <HeaderSection
          title="Payment Status"
          subtitle="Thank you for your payment"
        />
        <div className="payment-success-card">
          <div className="success-header">
            <CheckCircle className="success-icon" />
            <h2>Payment Received</h2>
          </div>
          <div className="success-content">
            <p>We have already received the payment for request number: {requestNumber}</p>
            <div className="payment-details">
              <p>Payment Date: {formatDate(requestData.payment_date)}</p>
              <p>Amount Paid: ₹{requestData.amount}</p>
            </div>
            <Link to={`/status/${requestNumber}`} className="success-action-btn">
              Check Status
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <HeaderSection
        title="Make Payment"
        subtitle="Complete your payment to proceed with biodata creation"
      />
      
      <div className="payment-card">
        <div className="payment-header">
          <PaymentIcon className="payment-header-icon" />
          <h2>Payment Details</h2>
        </div>

        <div className="request-details">
          <div className="detail-row">
            <Person className="detail-icon" />
            <div className="detail-content">
              <label>Name</label>
              <p>{requestData.user_details.name}</p>
            </div>
          </div>

          <div className="detail-row">
            <Email className="detail-icon" />
            <div className="detail-content">
              <label>Email</label>
              <p>{requestData.user_details.email}</p>
            </div>
          </div>

          <div className="detail-row">
            <Phone className="detail-icon" />
            <div className="detail-content">
              <label>Mobile</label>
              <p>{requestData.user_details.mobileNumber}</p>
            </div>
          </div>

          <div className="detail-row">
            <AccessTime className="detail-icon" />
            <div className="detail-content">
              <label>Request Date</label>
              <p>{formatDate(requestData.created_at)}</p>
            </div>
          </div>
        </div>

        <div className="payment-amount">
          <h3>Amount to Pay</h3>
          <div className="amount">₹{requestData.amount}</div>
        </div>

        {isPaymentEnabled() ? (
          <button 
            className="payment-button"
            onClick={() => {/* Implement payment gateway integration */}}
          >
            Proceed to Pay
          </button>
        ) : (
          <div className="payment-disabled">
            <ErrorOutline />
            <p>Payment link is not active yet. Please wait for user approval.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;