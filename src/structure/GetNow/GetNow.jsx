import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetNow.css";
import { UserDetailsStorage } from "../../supabase/UserDetails";
import Loader from "../Loader/Loader";

const GetNow = ({ isOpen, onClose, modelDetails }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
          <h2>Request Biodata</h2>
          <p>Please fill these details.</p>
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
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
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
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength={10}
              minLength={10}
              title="Please enter a valid 10-digit phone number"
              required
            />
          </div>

          <button type="submit" className="getnow-submit-button">
            Save & Continue
          </button>
        </form>
      </div>
      {isLoading && <Loader/>}
    </div>
  );
};

export default GetNow;
