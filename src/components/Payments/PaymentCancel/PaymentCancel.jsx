import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Cancel,
  ArrowBack,
  Refresh,
  Support,
  Person,
  WhatsApp,
} from "@mui/icons-material";
import "./PaymentCancel.css";
import SupportPopup from "../../SupportPopup/SupportPopup";
import { maskMobileNumber } from "../../../utils/MobileNumberHelper";
import SEO from "../../SEO/SEO";

const PaymentCancel = () => {
  const [showSupport, setShowSupport] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { requestNumber, userDetails, modelDetails } = location.state || {};

  const seoData = {
    title: `Payment Cancelled - Request #${requestNumber} | Ditvi Biodata`,
    description:
      "Payment cancellation page for your biodata request. Try payment again or contact our support team for assistance with your biodata creation service.",
    keywords:
      "payment cancelled, retry payment, biodata payment, Ditvi Biodata payment, payment support",
    ogImage: "/images/payment-cancel-og.jpg",
    canonicalUrl: `https://ditvi.org/payment-cancel/${requestNumber}`,
    noindex: true,
    schema: {
      "@context": "https://schema.org",
      "@type": "CancelAction",
      actionStatus: "CompletedActionStatus",
      agent: {
        "@type": "Person",
        name: userDetails?.name,
      },
      object: {
        "@type": "PayAction",
        price: modelDetails?.amount,
        priceCurrency: "INR",
        identifier: requestNumber,
      },
      provider: {
        "@type": "Organization",
        name: "Ditvi Biodata",
        logo: {
          "@type": "ImageObject",
          url: "https://ditvi.org/images/logo.png",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9263767441",
          contactType: "customer service",
          availableLanguage: ["English", "Hindi"],
        },
      },
      potentialAction: [
        {
          "@type": "PayAction",
          name: "Try Payment Again",
          url: `https://ditvi.org/payment/${requestNumber}`,
        },
        {
          "@type": "ContactAction",
          name: "Contact Support",
          url: "https://ditvi.org/contact",
        },
      ],
    },
  };

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
    setShowSupport(true);
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="payment-page">
        <div className="payment-card">
          <div className="payment-header">
            <Cancel className="payment-header-icon" />
            <h2>Payment Cancelled</h2>
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
                    <p>{userDetails?.name}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <WhatsApp className="detail-icon" />
                  <div className="detail-content">
                    <label>WhatsApp Number</label>
                    <p>{maskMobileNumber(userDetails?.mobileNumber)}</p>
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
                    {modelDetails.amount}
                  </div>
                </div>
              </div>
            </div>

            <div className="alert-message">
              <Cancel className="alert-icon" />
              <p
                style={{
                  color: "#d32f2f",
                }}
              >
                Your payment was not processed and no amount has been deducted
                from your account.
              </p>
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
        {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
      </div>
    </>
  );
};

export default PaymentCancel;
