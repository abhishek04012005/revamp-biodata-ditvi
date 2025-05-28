import React from 'react';
import "./NotificationPopUp.css";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const NotificationPopUp = ({ title, message, onClose }) => {
  return (
    <div className="create-biodata-notification-overlay">
      <div className="create-biodata-notification-popup">
        <div className="create-biodata-notification-header">
          <div className="create-biodata-notification-icon-large">
            <div className="create-biodata-notification-alert-icon">
              <ReportProblemIcon />
            </div>
            <div>
              <h1>Alert</h1>
            </div>
          </div>
          <button
            className="create-biodata-notification-close"
            onClick={onClose}
            aria-label="Close notification"
          >
            <span>×</span>
          </button>
        </div>
        <div className="create-biodata-notification-content">
          <div className="create-biodata-notification-text">
            <h3 className="create-biodata-notification-title">
              {title}
            </h3>
            <p className="create-biodata-notification-message">
              {message}
            </p>
          </div>
          <div className="create-biodata-notification-actions">
            <button
              className="create-biodata-notification-confirm"
              onClick={onClose}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopUp;