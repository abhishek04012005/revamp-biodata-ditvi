import React from 'react';
import { CheckCircle, Close } from '@mui/icons-material';
import './ThankYouPopUp.css';

const ThankYouPopUp = ({ 
  message = "Thank you for your submission!", 
  subMessage = "We'll get back to you soon.", 
  onClose
}) => {
  return (
    <div className="thankyou-overlay" onClick={onClose}>
      <div className="thankyou-popup" onClick={(e) => e.stopPropagation()}>
        <div className="thankyou-content">
          <div className="thankyou-icon-wrapper">
            <CheckCircle className="thankyou-icon" />
          </div>
          <h2 className="thankyou-title">Thank You!</h2>
          <p className="thankyou-message">{message}</p>
          {subMessage && <p className="thankyou-submessage">{subMessage}</p>}
          <button className="thankyou-close-btn" onClick={onClose}>
            <Close />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPopUp;