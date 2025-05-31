import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Payment.css";
import {
  ErrorOutline,
  CheckCircle,
  Payment as PaymentIcon,
  Person,
  Phone,
  AccessTime,
  SearchOff,
  Home,
  CreditCard,
  Receipt,
  Lock,
} from "@mui/icons-material";
import HeaderSection from "../../../structure/HeaderSection/HeaderSection";
import { BiodataRequestStorage } from "../../../supabase/BiodataRequest";
import { getLatestStatusId } from "../../../utils/StatusHelper";
import formatDate from "../../../utils/DateHelper";
import { PaymentRequestStorage } from "../../../supabase/PaymentRequest";
import { PaymentStatus } from "../../../json/PaymentStatus";
import { getRazorpayOptions } from "./PaymentConfig";
import Loader from "../../../structure/Loader/Loader";

const Payment = () => {
  const { requestNumber } = useParams();
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create script element
    const razorpayScript = document.createElement("script");
    razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
    razorpayScript.async = true;

    // Add to document head
    document.head.appendChild(razorpayScript);

    // Cleanup function
    return () => {
      document.head.removeChild(razorpayScript);
    };
  }, []);

  useEffect(() => {
    fetchRequestDetails();
  }, [requestNumber]);

  const fetchRequestDetails = async () => {
    try {
      setLoading(true);
      const response =
        await BiodataRequestStorage.getBiodataRequestByRequestNumber(
          requestNumber
        );
      if (response) {
        setRequestData(response);
      } else {
        setError("Invalid request number");
      }
    } catch (err) {
      setError("Error fetching request details");
    } finally {
      setLoading(false);
    }
  };

  const initiatePayment = async () => {
    if (!window.Razorpay) {
      setError("Payment system is not loaded yet. Please try again.");
      return;
    }
    try {
      const paymentRequest = await PaymentRequestStorage.initiatePaymentRequest(
        {
          requestNumber: requestNumber,
          amount: requestData.model_details.amount,
        }
      );
      if (paymentRequest) {
        // Redirect to payment gateway or handle payment confirmation

        const options = getRazorpayOptions({
          paymentRequest,
          requestNumber,
          handlePaymentSuccess,
          handlePaymentCancelled,
        });

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on("payment.failed", async function (response) {
          await handlePaymentFailure(
            response,
            paymentRequest.id,
            razorpayInstance
          );
        });
        razorpayInstance.open();
      } else {
        setError("Failed to initiate payment");
      }
    } catch (err) {
      setError("Error initiating payment");
    }
  };

  const handlePaymentSuccess = async (response, paymentRequestId) => {
    try {
      const paymentDBResponse = PaymentRequestStorage.updatePaymentStatus(
        paymentRequestId,
        {
          status: PaymentStatus.Completed,
          response: response,
          transactionId: response.razorpay_payment_id,
        }
      );

      const biodataDBResponse =
        BiodataRequestStorage.updateStatusBiodataRequestByRequestNumber(
          requestNumber,
          [
            ...requestData.status,
            {
              id: 4,
              created: new Date().toISOString(),
            },
          ]
        );

      if (paymentDBResponse && biodataDBResponse) {
        // Redirect to success page
        navigate(`/payment-success/${requestNumber}`);
      } else {
        alert("Satus update failed.");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert(
        "Payment was successful but status update failed. Please contact support."
      );
    }
  };

  const handlePaymentFailure = async (
    response,
    paymentRequestId,
    razorpayInstance
  ) => {
    try {
      const dbResponse = PaymentRequestStorage.updatePaymentStatus(
        paymentRequestId,
        {
          status: PaymentStatus.Failed,
          response: response,
        }
      );
      if (dbResponse) {
        // Redirect to success page
        navigate(`/payment-failure/${paymentRequestId}`);
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert(
        "Payment was failure and status update failed. Please contact support."
      );
    } finally {
      razorpayInstance.close();
    }
  };

  const handlePaymentCancelled = async (paymentRequestId) => {
    try {
      const dbResponse = PaymentRequestStorage.updatePaymentStatus(
        paymentRequestId,
        {
          status: PaymentStatus.Cancelled,
        }
      );

      if (dbResponse) {
        // Redirect to success page
        navigate("/payment-cancelled", {
          state: {
            requestNumber: requestNumber,
            userDetails: requestData.user_details,
            modelDetails: requestData.model_details,
          },
        });
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert(
        "Payment was successful but status update failed. Please contact support."
      );
    }
  };

  const isPaymentEnabled = () => {
    if (!requestData) return false;
    const latestStatus = getLatestStatusId(requestData.status);
    return latestStatus === 3; // User Approved status
  };

  const isPaymentCompleted = () => {
    if (!requestData) return false;
    const latestStatus = getLatestStatusId(requestData.status);
    return latestStatus > 4; // Payment completed
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !requestData) {
    return (
      <div className="payment-page">
        {/* <HeaderSection
          title="Make Payment"
          subtitle="Complete your payment to proceed with biodata creation"
        /> */}
        <div className="payment-error-card">
          <div className="error-header">
            <ErrorOutline className="error-icon" />
            <h2>Invalid Request</h2>
          </div>
          <div className="error-content">
            <SearchOff className="error-illustration" />
            <p>{error || "Request not found"}</p>
            <Link to="/" className="error-action-btn">
              <Home /> Return to Homepage
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
            <h2>Payment Successfully Received</h2>
          </div>
          <div className="success-content">
            <div className="success-message">
              <Receipt className="receipt-icon" />
              <p>
                Payment confirmed for request: <strong>{requestNumber}</strong>
              </p>
            </div>
            <div className="payment-details">
              <div className="payment-detail-item">
                <AccessTime className="detail-icon" />
                <span>Payment Date:</span>
                <strong>{formatDate(requestData.payment_date)}</strong>
              </div>
              <div className="payment-detail-item">
                <CreditCard className="detail-icon" />
                <span>Amount Paid:</span>
                <strong>₹{requestData.amount}</strong>
              </div>
            </div>
            <Link
              to={`/status/${requestNumber}`}
              className="success-action-btn"
            >
              Track Your Request Status
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      {/* <HeaderSection
        title="Make Payment"
        subtitle="Complete your payment to proceed with biodata creation"
      /> */}

      <div className="payment-card">
        <div className="payment-header">
          <PaymentIcon className="payment-header-icon" />
          <h2>Payment Details</h2>
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
                  <p>{requestData.user_details.name}</p>
                </div>
              </div>

              <div className="detail-item">
                <Phone className="detail-icon" />
                <div className="detail-content">
                  <label>Mobile Number</label>
                  <p>{requestData.user_details.mobileNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-summary">
            <h3>Payment Summary</h3>
            <div className="amount-card">
              <div className="amount-details">
                <span>Total Amount</span>
                <div className="amount">
                  <span>₹ </span>
                  {requestData.model_details.amount}
                </div>
              </div>
              <div className="secure-payment">
                <Lock className="lock-icon" />
                <span>100% Secure Payment</span>
              </div>
            </div>
          </div>

          {isPaymentEnabled() ? (
            <button className="payment-button" onClick={initiatePayment}>
              <CreditCard />
              Proceed to Payment
            </button>
          ) : (
            <div className="payment-disabled">
              <ErrorOutline className="warning-icon" />
              <p>
                Payment link is not active yet. Please wait for user approval.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
