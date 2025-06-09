import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Error,
  ArrowBack,
  ErrorOutline,
  Refresh,
  Support,
  Person,
  WhatsApp,
} from "@mui/icons-material";
import "./PaymentFailure.css";
import { maskMobileNumber } from "../../../utils/MobileNumberHelper";

import SupportPopup from "../../SupportPopup/SupportPopup";
import SEO from "../../SEO/SEO";

const PaymentFailure = () => {
  const [showSupport, setShowSupport] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { requestNumber, userDetails, modelDetails } = location.state || {};

  const seoData = {
    title: `Payment Failed - Request #${requestNumber} | Ditvi Biodata`,
    description:
      "Payment failure notification for your biodata request. Retry payment or contact our support team for immediate assistance with your biodata creation service.",
    keywords:
      "payment failed, retry payment, biodata payment failure, Ditvi Biodata payment, payment support",
    ogImage: "/images/payment-failure-og.jpg",
    canonicalUrl: `https://ditvi.org/payment-failure/${requestNumber}`,
    noindex: true,
    schema: {
      "@context": "https://schema.org",
      "@type": "FailAction",
      actionStatus: "FailedActionStatus",
      error: {
        "@type": "Thing",
        name: "Payment Failure",
        description: "Payment transaction could not be completed",
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
          email: "support@ditvi.org",
          availableLanguage: ["English", "Hindi"],
        },
      },
      potentialAction: [
        {
          "@type": "PayAction",
          name: "Retry Payment",
          url: `https://ditvi.org/payment/${requestNumber}`,
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://ditvi.org/payment/{request_number}",
          },
        },
        {
          "@type": "ContactAction",
          name: "Contact Support",
          url: "https://ditvi.org/contact",
          contactType: "Customer Support",
        },
      ],
      mainEntityOfPage: {
        "@type": "WebPage",
        name: "Payment Failure Page",
        isAccessibleForFree: true,
      },
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
            <Error className="payment-header-icon" />
            <h2>Payment Failed</h2>
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
              <ErrorOutline className="alert-icon" />
              <p>
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

export default PaymentFailure;
