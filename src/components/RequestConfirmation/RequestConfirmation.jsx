import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle,
  WhatsApp,
  TrackChanges,
  Style,
  CurrencyRupee,
  Language,
  Category,
  Person,
} from "@mui/icons-material";
import "./RequestConfirmation.css";
import { getWhatsappMessageByStatus } from "../../messages/whatsapp/status";
import { maskMobileNumber } from "../../utils/MobileNumberHelper";
import SEO from "../SEO/SEO";

const RequestConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestNumber, userDetails, modelDetails } = location.state || {};

  const seoData = {
    title: `Request Confirmation #${requestNumber} | Ditvi Biodata`,
    description:
      "Your biodata request has been confirmed. Track your request status or connect with us on WhatsApp for updates about your professional marriage biodata creation.",
    keywords:
      "biodata confirmation, request tracking, marriage biodata status, Ditvi Biodata request, biodata WhatsApp support",
    ogImage: "/images/confirmation-og.jpg", // Add your OG image
    canonicalUrl: `https://biodata.ditvi.org/request-confirmation/${requestNumber}`, // Update with your domain
    noindex: true, // Prevent indexing of personal confirmation pages
    schema: {
      "@context": "https://schema.org",
      "@type": "OrderConfirmation",
      orderNumber: requestNumber,
      merchant: {
        "@type": "Organization",
        name: "Ditvi Biodata",
        logo: {
          "@type": "ImageObject",
          url: "/images/logo.png", // Add your logo path
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9263767441",
          contactType: "customer service",
          availableLanguage: ["English", "Hindi"],
        },
      },
      orderStatus: "https://schema.org/OrderProcessing",
      customer: {
        "@type": "Person",
        name: userDetails?.name,
      },
      orderItem: {
        "@type": "Service",
        name: `Biodata Creation - ${modelDetails?.type}`,
        offers: {
          "@type": "Offer",
          price: modelDetails?.amount,
          priceCurrency: "INR",
        },
      },
    },
  };

  const handleTrackStatus = () => {
    navigate(`/track-status/${requestNumber}`);
  };

  const handleWhatsApp = () => {
  const messageInfo = {
    name: userDetails?.name || "",
    requestNumber: requestNumber
  };

  const messages = getWhatsappMessageByStatus(0, messageInfo);
  const requestConfirmationMessage = messages[0]?.message || "";
  
  const whatsappUrl = `https://wa.me/919263767441?text=${encodeURIComponent(requestConfirmationMessage)}`;
  window.open(whatsappUrl, "_blank");
};

  return (
    <>
      <SEO {...seoData} />
      <div className="payment-page">
        <div className="payment-card">
          <div className="payment-header">
            <CheckCircle className="payment-header-icon success" />
            <h2>Request Confirmed</h2>
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
                    <p>{userDetails.name}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <WhatsApp className="detail-icon" />
                  <div className="detail-content">
                    <label>WhatsApp Number</label>
                    <p>{maskMobileNumber(userDetails.mobileNumber)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="model-summary">
              <h3>Model Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <Style className="detail-icon" />
                  <div className="detail-content">
                    <label>Model Number</label>
                    <p>{modelDetails.modelNumber}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <CurrencyRupee className="detail-icon" />
                  <div className="detail-content">
                    <label>Amount</label>
                    <p>₹ {modelDetails.amount}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <Category className="detail-icon" />
                  <div className="detail-content">
                    <label>Type</label>
                    <p>{modelDetails.type}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <Language className="detail-icon" />
                  <div className="detail-content">
                    <label>Language</label>
                    <p>{modelDetails.language}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert-message success">
              <CheckCircle className="alert-icon" />
              <p>Your biodata request has been successfully received.</p>
            </div>

            <div className="action-buttons">
              <button className="primary-button" onClick={handleTrackStatus}>
                <TrackChanges /> Track Status
              </button>
              <button className="secondary-button" onClick={handleWhatsApp}>
                <WhatsApp /> Connect on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestConfirmation;
