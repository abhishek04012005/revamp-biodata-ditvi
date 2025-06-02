import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Payment.css";
import {
  ErrorOutline,
  CheckCircle,
  Payment as PaymentIcon,
  Person,
  WhatsApp,
  AccessTime,
  SearchOff,
  Home,
  CreditCard,
  Receipt,
  Lock,
} from "@mui/icons-material";
import { BiodataRequestStorage } from "../../../supabase/BiodataRequest";
import { getLatestStatusId } from "../../../utils/StatusHelper";
import { PaymentRequestStorage } from "../../../supabase/PaymentRequest";
import { PaymentStatus } from "../../../json/PaymentStatus";
import { getRazorpayOptions } from "./PaymentConfig";
import Loader from "../../../structure/Loader/Loader";
import { maskMobileNumber } from "../../../utils/MobileNumberHelper";

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
        const options = {
          ...getRazorpayOptions({
            paymentRequest,
            requestNumber,
            handlePaymentSuccess,
            handlePaymentCancelled,
          }),
          modal: {
            ondismiss: function () {
              handlePaymentCancelled(paymentRequest.id);
            },
          },
          handler: function (response) {
            if (response.razorpay_payment_id) {
              handlePaymentSuccess(response, paymentRequest.id);
            }
          },
        };

        const razorpayInstance = new window.Razorpay(options);

        razorpayInstance.on("payment.failed", function (response) {
          razorpayInstance.close();
          setTimeout(() => {
            handlePaymentFailure(response, paymentRequest.id);
          }, 300);
        });

        razorpayInstance.open();
      } else {
        setError("Failed to initiate payment");
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      setError("Error initiating payment");
    }
  };

  const handlePaymentSuccess = async (response, paymentRequestId) => {
    try {
      const paymentDBResponse = await PaymentRequestStorage.updatePaymentStatus(
        paymentRequestId,
        {
          status: PaymentStatus.Completed,
          response: response,
          transactionId: response.razorpay_payment_id,
        }
      );

      const biodataDBResponse =
        await BiodataRequestStorage.updateStatusBiodataRequestByRequestNumber(
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

  const handlePaymentFailure = async (response, paymentRequestId) => {
    try {
      const dbResponse = await PaymentRequestStorage.updatePaymentStatus(
        paymentRequestId,
        {
          status: PaymentStatus.Failed,
          response: response,
          error_code: response.error.code,
          error_description: response.error.description,
        }
      );

      if (dbResponse) {
        navigate("/payment-failure", {
          state: {
            requestNumber: requestNumber,
            userDetails: requestData.user_details,
            modelDetails: requestData.model_details,
            error: response.error,
          },
        });
      } else {
        throw new Error("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error handling payment failure:", error);
      alert(
        "Something went wrong while processing your payment. Please contact support."
      );
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
    return latestStatus >= 4; // Payment completed
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !requestData) {
    return (
      <div className="payment-page">
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
    navigate(`/payment-success/${requestNumber}`);
  }

  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-header">
          <PaymentIcon className="payment-header-icon" />
          <h2>
            {" "}
            {isPaymentEnabled()
              ? "Payment Details"
              : "Payment Link Inactive"}{" "}
          </h2>
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
                  <p>{requestData.user_details.name}</p>
                </div>
              </div>

              <div className="detail-item">
                <WhatsApp className="detail-icon" />
                <div className="detail-content">
                  <label>WhatsApp Number</label>
                  <p>
                    {maskMobileNumber(requestData.user_details.mobileNumber)}
                  </p>
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
                Payment link is inactive now. Please wait for admin approval.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
