import React from 'react';
import { CheckCircle, Close } from '@mui/icons-material';
import './ModalSuccess.css';

const ModalSuccess = ({ 
  title = "Success!", 
  message = "Operation completed successfully", 
  onClose 
}) => {
  return (
    <div className="modal-success-overlay" onClick={onClose}>
      <div className="modal-success-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-success-content">
          <div className="modal-success-icon-wrapper">
            <CheckCircle className="modal-success-icon" />
          </div>
          <h2 className="modal-success-title">{title}</h2>
          <p className="modal-success-message">{message}</p>
          <button className="modal-success-close" onClick={onClose}>
            <Close />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;