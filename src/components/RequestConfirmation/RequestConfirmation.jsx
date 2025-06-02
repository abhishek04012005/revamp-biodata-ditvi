import { useNavigate, useLocation } from "react-router-dom";
import {
  Check,
  WhatsApp,
  TrackChanges,
  Style,
  CurrencyRupee,
  Language,
  Category,
  Person,
} from "@mui/icons-material";
import "./RequestConfirmation.css";
import { maskMobileNumber } from "../../utils/MobileNumberHelper";

const RequestConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestNumber, userDetails, modelDetails } = location.state || {};

  const handleTrackStatus = () => {
    navigate(`/track-status/${requestNumber}`);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919263767441", "_blank");
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-header">
          <Check className="payment-header-icon success" />
          <h2>Request Confirmed</h2>
        </div>

        <div className="request-details">
          <div className="detail-section">
            <h1 className="payment-request-number">
              Request No. #{requestNumber}
            </h1>

            <div className="detail-grid">
              <div className="detail-item">
                <Person className="detail-icon" />
                <div className="detail-content">
                  <label>Full Name</label>
                  <p>{userDetails.name}</p>
                </div>
              </div>

              <div className="detail-item">
                <WhatsApp className="detail-icon" />
                <div className="detail-content">
                  <label>WhatsApp Number</label>
                  <p>{maskMobileNumber(userDetails.mobileNumber)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="model-summary">
            <h3>Model Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <Style className="detail-icon" />
                <div className="detail-content">
                  <label>Model Number</label>
                  <p>{modelDetails.modelNumber}</p>
                </div>
              </div>

              <div className="detail-item">
                <CurrencyRupee className="detail-icon" />
                <div className="detail-content">
                  <label>Amount</label>
                  <p>₹ {modelDetails.amount}</p>
                </div>
              </div>

              <div className="detail-item">
                <Category className="detail-icon" />
                <div className="detail-content">
                  <label>Type</label>
                  <p>{modelDetails.type}</p>
                </div>
              </div>

              <div className="detail-item">
                <Language className="detail-icon" />
                <div className="detail-content">
                  <label>Language</label>
                  <p>{modelDetails.language}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="alert-message success">
            <Check className="alert-icon" />
            <p>Your biodata request has been successfully received.</p>
          </div>

          <div className="action-buttons">
            <button className="primary-button" onClick={handleTrackStatus}>
              <TrackChanges /> Track Status
            </button>
            <button className="secondary-button" onClick={handleWhatsApp}>
              <WhatsApp /> Connect on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestConfirmation;
