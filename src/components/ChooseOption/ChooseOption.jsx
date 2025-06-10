import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChooseOption.css";
import { WhatsApp, Upload, Create, ArrowForward } from "@mui/icons-material";
import Container from "../../structure/Container/Container";
import { BiodataRequestStorage } from "../../supabase/BiodataRequest";
import { getWhatsappMessageByStatus } from "../../messages/whatsapp/status";
import Loader from "../../structure/Loader/Loader";
import SEO from "../SEO/SEO";

const OptionCard = ({ icon, title, description, onClick, primary }) => (
  <div className={`option-card ${primary ? "primary" : ""}`} onClick={onClick}>
    <div className="option-icon">{icon}</div>
    <h3 className="option-title">{title}</h3>
    <p className="option-description">{description}</p>
  </div>
);

const ChooseOption = () => {
  const location = useLocation();
  const { requestNumber, userDetails, modelDetails } = location.state || {};
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const seoData = {
    title: "Choose Your Biodata Creation Method | Ditvi Biodata",
    description:
      "Select your preferred method to create a professional marriage biodata with Ditvi Biodata. Connect via WhatsApp, upload existing biodata, or create from scratch with our expert team.",
    keywords:
      "biodata creation, marriage biodata, whatsapp biodata service, upload biodata, create biodata, Ditvi Biodata, traditional biodata maker",
    ogImage: "/images/choose-option-og.jpg", // Add your OG image
    canonicalUrl: "https://biodata.ditvi.org/choose-option", // Update with your domain
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Ditvi Biodata Creation Options",
      provider: {
        "@type": "Organization",
        name: "Ditvi Foundation",
        description: "Professional marriage biodata creation service",
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
      offers: {
        "@type": "AggregateOffer",
        offerCount: "3",
        itemListElement: [
          {
            "@type": "Offer",
            name: "WhatsApp Consultation",
            description:
              "Direct consultation with biodata experts via WhatsApp",
          },
          {
            "@type": "Offer",
            name: "Biodata Upload Service",
            description: "Professional redesign of existing biodata",
          },
          {
            "@type": "Offer",
            name: "Custom Biodata Creation",
            description: "Create new biodata from scratch with expert guidance",
          },
        ],
      },
      review: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "5000",
        bestRating: "5",
      },
    },
  };

  const handleWhatsAppClick = async () => {
    try {
      setIsLoading(true);
      await BiodataRequestStorage.saveBiodataRequestFromWhatsapp({
        requestNumber: requestNumber,
        userDetails: userDetails,
        modelDetails: modelDetails,
      });
      navigate("/confirmation", {
        state: {
          requestNumber: requestNumber,
          userDetails: userDetails,
          modelDetails: modelDetails,
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }

const messageInfo = {
    name: userDetails?.name || "",
    requestNumber: requestNumber
  };

  const messages = getWhatsappMessageByStatus(0, messageInfo);
  const requestConfirmationMessage = messages[0]?.message || "";
  
  const whatsappUrl = `https://wa.me/919263767441?text=${encodeURIComponent(requestConfirmationMessage)}`;
  window.open(whatsappUrl, "_blank");
  };

  const handleUploadBiodata = () => {
    try {
      setIsLoading(true);
      navigate("/upload-biodata", {
        state: {
          requestNumber: requestNumber,
          userDetails: userDetails,
          modelDetails: modelDetails,
        },
      });
    } catch (error) {
      console.error("Error navigating to upload biodata:", error);
      setError("Failed to navigate to upload biodata. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBiodata = () => {
    try {
      setIsLoading(true);
      navigate("/create-biodata", {
        state: {
          requestNumber: requestNumber,
          userDetails: userDetails,
          modelDetails: modelDetails,
        },
      });
    } catch (error) {
      console.error("Error navigating to create biodata:", error);
      setError("Failed to navigate to create biodata. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO {...seoData} />

      <section className="choose-option">
        <Container>
          <div className="choose-option-content">
            <div className="choose-option-header">
              <h1>How Would You Like to Proceed?</h1>
              <p>Choose the option that best suits your needs</p>
              {error && <p className="error-message">{error}</p>}
            </div>

            <div className="options-grid">
              <OptionCard
                icon={<WhatsApp />}
                title="Connect on WhatsApp"
                description="Chat with our experts directly on WhatsApp for quick assistance"
                onClick={handleWhatsAppClick}
                primary
              />

              <div className="option-card-wrapper">
                <OptionCard
                  icon={<Upload />}
                  title="Upload Existing Biodata"
                  description="Already have a biodata? Upload it here for redesigning"
                  onClick={handleUploadBiodata}
                />
              </div>

              <OptionCard
                icon={<Create />}
                title="Create New Biodata"
                description="Start fresh and create your biodata from scratch"
                onClick={handleCreateBiodata}
              />
            </div>
          </div>

          <br />
          <br />
          <br />

          <div className="choose-hero">
            <div className="hero-left">
              <img
                src="https://www.georgiaaquarium.org/wp-content/uploads/2018/08/common-bottlenose-dolphin.jpg"
                alt="Biodata Creation"
                className="hero-image"
              />
            </div>
            <div className="hero-right">
              <h1 className="hero-title">Create Your Perfect Biodata</h1>
              <p className="hero-description">
                Your journey to finding the perfect match begins with a
                well-crafted biodata. Let us help you create a biodata that
                truly represents you and your values.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4.9★</span>
                  <span className="stat-label">Customer Rating</span>
                </div>
              </div>
              <button className="hero-cta" onClick={() => navigate("/pricing")}>
                Get Started Today
                <ArrowForward />
              </button>
            </div>
          </div>
        </Container>
        {isLoading && <Loader />}
      </section>
    </>
  );
};

export default ChooseOption;
