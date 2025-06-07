import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Description,
  Check,
  ArrowForward,
  ArrowBack,
} from "@mui/icons-material";
import "./UploadBiodata.css";
import Container from "../../structure/Container/Container";
import HeaderSection from "../../structure/HeaderSection/HeaderSection";
import { UploadFile } from "../../supabase/UploadFile";
import { BiodataRequestStorage } from "../../supabase/BiodataRequest";
import StorageBucket from "../../constants/StorageBucket";
import Loader from "../../structure/Loader/Loader";
import SEO from "../SEO/SEO";

const UploadBiodata = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { requestNumber, userDetails, modelDetails } = location.state || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [biodataFile, setBiodataFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [biodataPreview, setBiodataPreview] = useState(null);
  const [error, setError] = useState("");
  const imageInputRef = useRef(null);
  const biodataInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const seoData = {
    title: "Upload Your Biodata | Ditvi Biodata Maker",
    description:
      "Upload your existing biodata and profile photo for professional enhancement. Our experts will redesign your marriage biodata while maintaining your original information.",
    keywords:
      "upload biodata, marriage biodata upload, profile photo upload, biodata enhancement, Ditvi Biodata upload service",
    ogImage: "/images/upload-biodata-og.jpg", // Add your OG image
    canonicalUrl: "https://yourdomain.com/upload-biodata", // Update with your domain
    noindex: true, // Prevent indexing of upload pages for privacy
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Upload Biodata - Ditvi Biodata Maker",
      description:
        "Upload your existing marriage biodata for professional enhancement",
      provider: {
        "@type": "Organization",
        name: "Ditvi Biodata",
        logo: {
          "@type": "ImageObject",
          url: "/images/logo.png", // Add your logo path
        },
      },
      offers: {
        "@type": "Offer",
        name: "Biodata Enhancement Service",
        description: "Professional redesign of existing marriage biodata",
        acceptedFileType: [
          "application/pdf",
          "application/msword",
          "image/jpeg",
          "image/png",
        ],
        eligibleRegion: {
          "@type": "Country",
          name: "India",
        },
      },
      step: [
        {
          "@type": "HowToStep",
          name: "Upload Profile Photo",
          text: "Upload a clear profile photo (Max 1MB, JPG/PNG format)",
        },
        {
          "@type": "HowToStep",
          name: "Upload Existing Biodata",
          text: "Upload your current biodata (Max 5MB, PDF/DOC/Image format)",
        },
        {
          "@type": "HowToStep",
          name: "Review & Submit",
          text: "Review your uploads and submit for professional enhancement",
        },
      ],
    },
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setError("");

    if (file && file.type.startsWith("image/")) {
      if (file.size > 1 * 1024 * 1024) {
        // 5MB limit
        setError("Image size should be less than 1MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBiodataUpload = (event) => {
    const file = event.target.files[0];
    setError("");
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (file && allowedTypes.includes(file.type)) {
      if (file.size > 5 * 1024 * 1024) {
        // 10MB limit
        setError("File size should be less than 5MB");
        return;
      }
      setBiodataFile(file);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBiodataPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setBiodataPreview(null);
      }
    }
  };

  const steps = [
    {
      title: "Upload Profile Photo",
      isComplete: !!imageFile,
    },
    {
      title: "Upload Existing Biodata",
      isComplete: !!biodataFile,
    },
    {
      title: "Review & Submit",
      isComplete: currentStep === 3 && !!imageFile && !!biodataFile,
    },
  ];

  const handleSubmit = async () => {
    if (!imageFile || !biodataFile) {
      setError("Please upload both files before continuing");
      return;
    }

    try {
      setIsLoading(true);
      const profileUrl = await UploadFile(
        imageFile,
        `${requestNumber}_profile_${new Date().getTime()}`,
        StorageBucket.UPLOAD_BIODATA
      );
      const biodataUrl = await UploadFile(
        biodataFile,
        `${requestNumber}_biodata`,
        StorageBucket.UPLOAD_BIODATA
      );
      await BiodataRequestStorage.saveBiodataRequestFromUploadBiodata({
        requestNumber: requestNumber,
        userDetails: userDetails,
        modelDetails: modelDetails,
        profileUrl: profileUrl,
        biodataUrl: biodataUrl,
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
  };

  return (
    <>
      <SEO {...seoData} />
      <section className="upload-files">
        <Container>
          <HeaderSection
            title={`Upload Biodata`}
            subtitle={`Upload Your Profile Photo and Existing Biodata.`}
          />
          <div className="upload-files-content">
            <div className="steps-progress">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`step ${currentStep === index + 1 ? "active" : ""} 
                                    ${step.isComplete ? "completed" : ""}`}
                >
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                  </div>
                </div>
              ))}
            </div>

            {error && <div className="error-message">{error}</div>}

            <div
              className="upload-section"
              style={{ display: currentStep === 1 ? "block" : "none" }}
            >
              <div className="upload-box">
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <div
                  className={`upload-area ${imagePreview ? "has-file" : ""}`}
                  onClick={() => imageInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="preview-container">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="image-preview"
                      />
                      <div className="preview-overlay">
                        <Check className="success-icon" />
                        <p>Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3>Upload Profile Photo</h3>
                      <button className="upload-photo-btn">Upload Photo</button>
                      <p>Click to upload your photo</p>
                      <span className="file-hint">
                        JPG, PNG or JPEG (Max 1MB)
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div
              className="upload-section"
              style={{ display: currentStep === 2 ? "block" : "none" }}
            >
              <div className="upload-box">
                <input
                  type="file"
                  ref={biodataInputRef}
                  onChange={handleBiodataUpload}
                  accept=".pdf,.doc,.docx,image/*"
                  style={{ display: "none" }}
                />
                <div
                  className={`upload-area ${biodataFile ? "has-file" : ""}`}
                  onClick={() => biodataInputRef.current?.click()}
                >
                  {biodataFile ? (
                    <div className="file-success">
                      {biodataPreview ? (
                        <div className="preview-container">
                          <img
                            src={biodataPreview}
                            alt="Biodata"
                            className="image-preview"
                          />
                          <div className="preview-overlay">
                            <Check className="success-icon" />
                            <p>Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Check className="success-icon" />
                          <h3>{biodataFile.name}</h3>
                          <p>Click to change file</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <h3>Upload Existing Biodata</h3>
                      <button className="upload-photo-btn">
                        Upload Biodata
                      </button>
                      <p>Click to upload your existing biodata</p>
                      <span className="file-hint">
                        PDF, DOC, or Image files (Max 5MB)
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div
              className="upload-section"
              style={{ display: currentStep === 3 ? "block" : "none" }}
            >
              <div className="review-section">
                <div className="review-item">
                  <h4>Profile Photo</h4>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="review-image"
                    />
                  )}
                </div>
                <div className="review-item">
                  <h4>Biodata</h4>
                  {biodataPreview ? (
                    <img
                      src={biodataPreview}
                      alt="Biodata"
                      className="review-image"
                    />
                  ) : (
                    <div className="file-info">
                      <Description />
                      <span>{biodataFile?.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="navigation-buttons">
              {currentStep > 0 && (
                <button
                  className="nav-button back"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  disabled={currentStep === 1}
                >
                  <ArrowBack /> Back
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  className="nav-button next"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  disabled={currentStep === 1 ? !imageFile : !biodataFile}
                >
                  Next <ArrowForward />
                </button>
              ) : (
                <button
                  className="nav-button submit"
                  onClick={handleSubmit}
                  disabled={!imageFile || !biodataFile}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </Container>
        {isLoading && <Loader />}
      </section>
    </>
  );
};

export default UploadBiodata;
