import React from "react";
import { Error, Close } from "@mui/icons-material";
import "./ModalError.css";

const ModalError = ({
  title = "Error!",
  message = "We're experiencing technical difficulties. Please try again later.",
  onClose,
}) => {
  return (
    <div className="modal-error-overlay" onClick={onClose}>
      <div
        className="modal-error-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-error-content">
          <div className="modal-error-icon-wrapper">
            <Error className="modal-error-icon" />
          </div>
          <h2 className="modal-error-title">{title}</h2>
          <p className="modal-error-message">{message}</p>
          <button className="modal-error-close" onClick={onClose}>
            <Close />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalError;
