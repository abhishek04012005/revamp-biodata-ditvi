import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../structure/Loader/Loader";
import "./CreateBiodata.css";
import ModelTypes from "../../json/ModelTypes";
import { UploadFile } from "../../supabase/UploadFile";
import { BiodataRequestStorage } from "../../supabase/BiodataRequest";
import StorageBucket from "../../constants/StorageBucket";
import { getLanguageData } from "../../json/languageCofig";
import {
  ProfileImageSection,
  PersonalDetailsSection,
  ProfessionalDetailsSection,
  EducationDetailsSection,
  FamilyDetailsSection,
  ContactDetailsSection,
  PreviewSection,
} from "./Sections";
import NotificationPopUp from "../../structure/NotificationPopUp/NotificationPopUp";
import { MAXIMUM_IMAGE_SIZE } from "../../utils/Constants";
import SEO from "../SEO/SEO";

const CreateBiodata = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { requestNumber, userDetails, modelDetails } = location.state || {};
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  const seoData = {
    title: "Create Your Professional Marriage Biodata | Ditvi Biodata Maker",
    description:
      "Create a customized, professional marriage biodata with our step-by-step form. Include personal details, professional information, family background, and more in multiple languages.",
    keywords:
      "create biodata, marriage biodata maker, biodata creation form, professional biodata, Ditvi Biodata, matrimonial profile",
    ogImage: "/images/create-biodata-og.jpg", // Add your OG image
    canonicalUrl: "https://biodata.ditvi.org/create-biodata", // Update with your domain
    noindex: true, // Prevent indexing of form pages
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Ditvi Biodata Creator",
      applicationCategory: "Matrimonial Service",
      operatingSystem: "Web Browser",
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
        price: modelDetails?.amount || "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      step: [
        {
          "@type": "HowToStep",
          name: "Profile Photo",
          text: "Upload a clear, recent profile photo",
        },
        {
          "@type": "HowToStep",
          name: "Personal Details",
          text: "Fill in your personal information",
        },
        {
          "@type": "HowToStep",
          name: "Professional Details",
          text: "Add your career information",
        },
        {
          "@type": "HowToStep",
          name: "Education Details",
          text: "Include your educational background",
        },
        {
          "@type": "HowToStep",
          name: "Family Details",
          text: "Provide family information",
        },
        {
          "@type": "HowToStep",
          name: "Contact Details",
          text: "Add your contact information",
        },
        {
          "@type": "HowToStep",
          name: "Preview & Submit",
          text: "Review and submit your biodata",
        },
      ],
      about: {
        "@type": "Thing",
        name: "Marriage Biodata",
        description: "Professional matrimonial profile creation service",
      },
    },
  };

  const langData = getLanguageData(modelDetails);

  const [formData, setFormData] = useState({
    profileImage: null,
    userDetails: userDetails,
    modelDetails: modelDetails,
    personalDetails: langData.personal.map(({ label, value, placeholder }) => ({
      label,
      value,
      placeholder,
    })),
    professionalDetails: langData.professional.map(
      ({ label, value, placeholder }) => ({ label, value, placeholder })
    ),
    examinationDetails: langData.examination.map(
      ({ label, value, placeholder }) => ({ label, value, placeholder })
    ),
    educationDetails: [
      langData.education.map(({ label, value, placeholder }) => ({
        label,
        value,
        placeholder,
      })),
    ],
    familyDetails: langData.family,
    contactDetails: langData.contact.map(({ label, value, placeholder }) => ({
      label,
      value,
      placeholder,
    })),
  });

  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, langData.steps.length - 1));
  const handlePrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAXIMUM_IMAGE_SIZE) {
      setNotification({
        show: true,
        title: "File Size Too Large",
        message:
          "Please upload an image that is less than or equal to 1MB in size. Large images may affect the loading time of your biodata.",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      setNotification({
        show: true,
        title: "Invalid File Type",
        message:
          "Please upload a valid image file (JPG, PNG, etc.). Other file types are not supported.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.onerror = () => {
        alert("Error reading file");
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    } catch (error) {
      console.error("Error handling image:", error);
      alert("Failed to process image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 0 && !formData.profileImage) {
      setNotification({
        show: true,
        title: `Please upload a profile picture`,
        message:
          "Please upload a clear, recent profile picture to complete your biodata.",
      });
      return;
    }

    if (currentStep !== langData.steps.length - 1) {
      handleNext();
      return;
    }

    try {
      setIsLoading(true);
      const profileUrl = await UploadFile(
        selectedImage,
        `${requestNumber}_profile`,
        StorageBucket.CREATE_BIODATA
      );

      const response =
        await BiodataRequestStorage.saveBiodataRequestFromCreateBiodata({
          requestNumber,
          userDetails,
          modelDetails,
          profileUrl,
          ...formData,
        });

      if (response) {
        navigate("/confirmation", {
          state: {
            requestNumber,
            userDetails,
            modelDetails,
          },
        });
      } else {
        alert("Failed. Unable to save the data.");
      }
    } catch (error) {
      console.error("Error saving biodata:", error);
      alert("Failed to save biodata");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    const props = {
      formData,
      setFormData,
      langData,
      modelDetails,
      handleImageChange,
      selectedImage,
      setSelectedImage,
      currentStep,
    };

    switch (currentStep) {
      case 0:
        return <ProfileImageSection {...props} />;
      case 1:
        return <PersonalDetailsSection {...props} />;
      case 2:
        return <ProfessionalDetailsSection {...props} />;
      case 3:
        return <EducationDetailsSection {...props} />;
      case 4:
        return <FamilyDetailsSection {...props} />;
      case 5:
        return <ContactDetailsSection {...props} />;
      case 6:
        return <PreviewSection {...props} />;
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="create-biodata-stepper">
        <div className="create-biodata-stepper-header">
          {langData.steps.map((step, index) => (
            <div
              key={index}
              className={`create-biodata-step ${
                index === currentStep ? "active" : ""
              } ${index < currentStep ? "completed" : ""}`}
            >
              <div className="create-biodata-step-number">{index + 1}</div>
              <div className="create-biodata-step-label">
                {step === "Professional" &&
                modelDetails?.type === ModelTypes.Student.Name
                  ? "Examination"
                  : step}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="create-biodata-stepper-form">
          {renderStepContent()}

          <div className="create-biodata-form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="create-biodata-nav-button prev"
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button type="submit" className="create-biodata-nav-button next">
              {currentStep === langData.steps.length - 1
                ? isLoading
                  ? "Saving..."
                  : "Save and Preview"
                : "Next"}
            </button>
          </div>
        </form>
      </div>

      {notification.show && (
        <NotificationPopUp
          title={notification.title}
          message={notification.message}
          onClose={() =>
            setNotification({ show: false, message: "", title: "" })
          }
        />
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default CreateBiodata;
