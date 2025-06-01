import React from 'react';
import { Close, WhatsApp, Email, Call } from '@mui/icons-material';
import './SupportPopup.css';

const SupportPopup = ({ onClose }) => {
  return (
    <div className="support-popup-overlay" onClick={onClose}>
      <div className="support-popup" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <Close />
        </button>
        
        <div className="support-header">
          <h2>Contact Support</h2>
          <p>We're here to help! Choose your preferred way to connect with us.</p>
        </div>

        <div className="support-options">
          <a 
            href="https://wa.me/919263767441" 
            target="_blank" 
            rel="noopener noreferrer"
            className="support-option whatsapp"
          >
            <WhatsApp />
            <div className="option-content">
              <h3>WhatsApp</h3>
              <p>Chat with us on WhatsApp</p>
            </div>
          </a>

          <a 
            href="mailto:care@ditvi.com" 
            className="support-option email"
          >
            <Email />
            <div className="option-content">
              <h3>Email</h3>
              <p>care@ditvi.com</p>
            </div>
          </a>

          <a 
            href="tel:+919263767441" 
            className="support-option phone"
          >
            <Call />
            <div className="option-content">
              <h3>Phone</h3>
              <p>+91 92637 67441</p>
            </div>
          </a>
        </div>

        <div className="support-footer">
          <p>Available Monday to Saturday, 9:00 AM to 6:00 PM IST</p>
        </div>
      </div>
    </div>
  );
};

export default SupportPopup;