import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Receipt,
  Timer,
  Support,
  ArrowBack,
  Timeline,
} from "@mui/icons-material";
import "./PaymentSuccess.css";
import { PaymentRequestStorage } from "../../../supabase/PaymentRequest";
import formatDate from "../../../utils/DateHelper";
import Loader from "../../../structure/Loader/Loader";
import SupportPopup from "../../SupportPopup/SupportPopup";
import SEO from "../../SEO/SEO";

const PaymentSuccess = () => {
  const [showSupport, setShowSupport] = useState(false);
  const navigate = useNavigate();
  const { requestNumber } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const seoData = {
  title: `Payment Successful - Request #${requestNumber} | Ditvi Biodata`,
  description: 
    "Your payment has been successfully processed. Track your biodata creation request status or contact our support team for any assistance.",
  keywords: 
    "payment successful, payment confirmation, biodata payment success, Ditvi Biodata payment, track biodata status",
  ogImage: "/images/payment-success-og.jpg",
  canonicalUrl: `https://ditvi.org/payment-success/${requestNumber}`,
  noindex: true,
  schema: {
    "@context": "https://schema.org",
    "@type": "CompletedPaymentAction",
    actionStatus: "CompletedActionStatus",
    result: {
      "@type": "PaymentStatusType",
      name: "Payment Success",
      description: "Payment transaction completed successfully"
    },
    object: {
      "@type": "PayAction",
      priceCurrency: "INR",
      identifier: requestNumber
    },
    provider: {
      "@type": "Organization",
      name: "Ditvi Biodata",
      logo: {
        "@type": "ImageObject",
        url: "https://ditvi.org/images/logo.png"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9263767441",
        contactType: "customer service",
        email: "support@ditvi.org",
        availableLanguage: ["English", "Hindi"]
      }
    },
    potentialAction: [
      {
        "@type": "ViewAction",
        name: "Track Status",
        url: `https://ditvi.org/track-status/${requestNumber}`,
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://ditvi.org/track-status/{request_number}"
        }
      },
      {
        "@type": "ContactAction",
        name: "Contact Support",
        url: "https://ditvi.org/contact",
        contactType: "Customer Support"
      }
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      name: "Payment Success Page",
      isAccessibleForFree: true
    }
  }
};

  useEffect(() => {
    fetchPaymentDetails();
  }, [requestNumber]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSupport = () => {
    setShowSupport(true);
  };

  const handleStatus = () => {
    navigate(`/track-status/${requestNumber}`);
  };

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true);
      const response =
        await PaymentRequestStorage.getPaymentRequestByRequestNumber(
          requestNumber
        );
      if (response) {
        setPaymentData(response);
      } else {
        setError("Payment details not found");
      }
    } catch (err) {
      setError("Error fetching payment details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !paymentData) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-error">
          <h2>Error Loading Payment Details</h2>
          <p>{error || "Unable to load payment information"}</p>
          <Link to="/" className="back-home-btn">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO {...seoData} />
      <div className="payment-page">
        <div className="payment-card">
          <div className="payment-header">
            <CheckCircle className="payment-header-icon" />
            <h2>Payment Confirmed</h2>
          </div>

          <div className="request-details">
            <div className="detail-section">
              <h1 className="payment-request-number">
                Request No. #{requestNumber}
              </h1>

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
              </div>
            </div>

            <div className="payment-summary">
              <h3>Payment Summary</h3>
              <div className="amount-card">
                <div className="amount-details">
                  <span>Total Amount</span>
                  <div className="amount">₹ {paymentData.amount}</div>
                </div>
              </div>
            </div>

            <div className="alert-message">
              <CheckCircle
                className="alert-icon"
                style={{ color: "#4CAF50" }}
              />
              <p
                style={{
                  color: "#4CAF50",
                  fontWeight: 500,
                }}
              >
                Payment was successfully processed and confirmed.
              </p>
            </div>

            <div className="action-buttons">
              <button className="primary-button" onClick={handleStatus}>
                <Timeline /> Track Status
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
        {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
      </div>
    </>
  );
};

export default PaymentSuccess;
