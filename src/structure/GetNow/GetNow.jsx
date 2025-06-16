import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetNow.css";
import { UserDetailsStorage } from "../../supabase/UserDetails";
import Loader from "../Loader/Loader";
import ModalError from "../ModalBox/ModalError/ModalError";
import { logEvent } from "../../utils/analytics";

const GetNow = ({
  isOpen,
  onClose,
  modelDetails,
  heading = "Request Biodata",
  paragraph = "Please fill these details.",
  buttonTitle = "Save and Continue",
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userDetail = await UserDetailsStorage.saveUserDetails({
        userDetails: {
          name: formData.name,
          mobileNumber: formData.mobileNumber,
        },
        modelDetails: {
          modelNumber: modelDetails.modelNumber,
          language: modelDetails.language,
          type: modelDetails.type,
          amount: modelDetails.amount,
        },
      });

      // Reset form data
      setFormData({
        name: "",
        mobileNumber: "",
      });

      // Close the modal
      onClose();

      // Navigate to check-option route
      navigate("/choose-option", {
        state: {
          requestNumber: userDetail.request_number,
          userDetails: {
            name: formData.name,
            mobileNumber: formData.mobileNumber,
          },
          modelDetails: modelDetails,
        },
      });
    } catch (error) {
      setError(true);
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
    logEvent("Get Now", "Submit", "Get Now");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    // Only update if first digit is 6,7,8,9 or if empty
    if (!value || /^[6-9]/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        mobileNumber: value,
      }));
    }
  };

  const handleNameChange = (e) => {
    // Allow only letters and spaces
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="getnow-overlay" onClick={handleOverlayClick}>
      <div className="getnow-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="getnow-close-button"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="getnow-header">
          <h2>{heading}</h2>
          <p>{paragraph}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="getnow-form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleNameChange}
              onKeyPress={(e) => {
                // Prevent non-alphabetic keys (except space and control keys)
                if (!/[A-Za-z\s]/.test(e.key) && e.key.length === 1) {
                  e.preventDefault();
                }
              }}
              pattern="[A-Za-z\s]{3,50}"
              required
              minLength={3}
              maxLength={50}
              title="Please enter a valid name (letters and spaces only)"
              aria-label="Full name"
            />
          </div>
          <div className="getnow-form-group">
            <label htmlFor="whatsapp">WhatsApp Number:</label>
            <input
              id="mobileNumber"
              type="tel"
              name="mobileNumber"
              placeholder="Enter your WhatsApp number"
              value={formData.mobileNumber}
              onChange={handleMobileNumberChange}
              onKeyPress={(e) => {
                // Prevent input if first digit isn't 6-9 or if length is already 10
                if (
                  (formData.mobileNumber.length === 0 &&
                    !/[6-9]/.test(e.key)) ||
                  !/[0-9]/.test(e.key) ||
                  formData.mobileNumber.length >= 10
                ) {
                  e.preventDefault();
                }
              }}
              pattern="[6-9][0-9]{9}"
              maxLength={10}
              minLength={10}
              inputMode="numeric"
              autoComplete="tel"
              title="Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
              required
              aria-label="WhatsApp number"
            />
          </div>

          <button type="submit" className="getnow-submit-button">
            {buttonTitle}
          </button>
        </form>
      </div>
      {error && <ModalError onClose={() => setError(false)} />}
      {isLoading && <Loader />}
    </div>
  );
};

export default GetNow;
