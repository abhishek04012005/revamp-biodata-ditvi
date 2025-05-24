import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Receipt, 
  Timer, 
  CurrencyRupee,
  ArrowForward,
  Download
} from '@mui/icons-material';
import './PaymentSuccess.css';
import HeaderSection from '../../../structure/HeaderSection/HeaderSection';
import { PaymentRequestStorage } from '../../../supabase/PaymentRequest';
import formatDate from '../../../utils/DateHelper';

const PaymentSuccess = () => {
  const { requestNumber } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPaymentDetails();
  }, [requestNumber]);

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true);
      const response = await PaymentRequestStorage.getPaymentRequestByRequestNumber(requestNumber);
      if (response) {
        setPaymentData(response);
      } else {
        setError('Payment details not found');
      }
    } catch (err) {
      setError('Error fetching payment details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-loader">
          <Timer className="loader-icon spin" />
          <p>Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !paymentData) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-error">
          <h2>Error Loading Payment Details</h2>
          <p>{error || 'Unable to load payment information'}</p>
          <Link to="/" className="back-home-btn">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success-container">
      <HeaderSection
        title="Payment Successful"
        subtitle="Your payment has been processed successfully"
      />

      <div className="payment-success-card">
        <div className="success-header">
          <CheckCircle className="success-icon" />
          <h2>Payment Confirmed</h2>
          <p>Thank you for your payment</p>
        </div>

        <div className="payment-details">
          <div className="detail-grid">
            <div className="detail-item">
              <Receipt className="detail-icon" />
              <div className="detail-content">
                <label>Transaction ID</label>
                <span>{paymentData.transaction_id}</span>
              </div>
            </div>

            <div className="detail-item">
              <Timer className="detail-icon" />
              <div className="detail-content">
                <label>Payment Date</label>
                <span>{formatDate(paymentData.updated_at)}</span>
              </div>
            </div>

            <div className="detail-item">
              <Receipt className="detail-icon" />
              <div className="detail-content">
                <label>Request Number</label>
                <span>{paymentData.request_number}</span>
              </div>
            </div>

            <div className="detail-item highlight">
              <CurrencyRupee className="detail-icon" />
              <div className="detail-content">
                <label>Amount Paid</label>
                <span className="amount">₹{paymentData.amount}</span>
              </div>
            </div>
          </div>

          <div className="receipt-download">
            <button className="download-btn">
              <Download /> Download Receipt
            </button>
          </div>

          <div className="next-steps">
            <h3>Next Steps</h3>
            <div className="steps-grid">
              <Link to={`/biodata/${paymentData.request_number}`} className="step-card">
                <div className="step-content">
                  <h4>View Your Biodata</h4>
                  <p>Check your biodata details and preview</p>
                </div>
                <ArrowForward className="step-icon" />
              </Link>

              <Link to={`/track-status/${paymentData.request_number}`} className="step-card">
                <div className="step-content">
                  <h4>Track Status</h4>
                  <p>Monitor your biodata creation progress</p>
                </div>
                <ArrowForward className="step-icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;