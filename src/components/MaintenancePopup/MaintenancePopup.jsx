import React from 'react';
import { Build, AccessTime, Warning } from '@mui/icons-material';
import './MaintenancePopup.css';

const MaintenancePopup = ({ message, estimatedTime, onClose }) => {
  return (
    <div className="maintenance-overlay">
      <div className="maintenance-container">
        <div className="maintenance-content">
          <div className="maintenance-icon-wrapper">
            <Build className="maintenance-icon" />
          </div>
          <h2 className="maintenance-title">System Maintenance</h2>
          <div className="maintenance-message">
            <Warning className="warning-icon" />
            <p>{message}</p>
          </div>
          <div className="maintenance-time">
            <AccessTime className="time-icon" />
            <p>Estimated downtime: {estimatedTime}</p>
          </div>
          <button className="maintenance-close" onClick={onClose}>
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePopup;