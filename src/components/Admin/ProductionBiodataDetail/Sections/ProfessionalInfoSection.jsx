import React from "react";
import { Work } from "@mui/icons-material";

export const ProfessionalInfoSection = ({
  formData,
  setFormData,
  isEditing,
  langData,
}) => {
  return renderSection(
    <Work />,
    langData?.biodataMaster.professionalDetails || "Professional Details",
    <div className="info-grid">
      {formData.professionalDetails.map((field, index) => (
        <div key={index} className="detail-field animated-field">
          <label>{field.label}:</label>
          {isEditing ? (
            <input
              className="input-field-edit"
              type="text"
              value={field.value}
              onChange={(e) => {
                const newProfessionalData = [...formData.professionalDetails];
                newProfessionalData[index].value = e.target.value;
                setFormData({
                  ...formData,
                  professionalDetails: newProfessionalData,
                });
              }}
              placeholder={`${field.label}`}
            />
          ) : (
            <span className="field-value">
              {field.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

const renderSection = (icon, title, children) => (
  <section className="detail-section info-section">
    <div className="section-header">
      <div className="header-icon">{icon}</div>
      <h2>{title}</h2>
    </div>
    <div className="section-content">{children}</div>
  </section>
);
