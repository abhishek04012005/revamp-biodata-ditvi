import React from "react";
import { Person } from "@mui/icons-material";

export const PersonalInfoSection = ({
  formData,
  setFormData,
  isEditing,
  langData,
}) => {
  return renderSection(
    <Person />,
    langData?.biodataMaster.personalDetails || "Personal Details",
    <div className="info-grid">
      {formData.personalDetails.map((field, index) => (
        <div key={index} className="detail-field animated-field">
          <label>{field.label}:</label>
          {isEditing ? (
            <input
              className="input-field-edit"
              type="text"
              value={field.value}
              onChange={(e) => {
                const newPersonalData = [...formData.personalDetails];
                newPersonalData[index].value = e.target.value;
                setFormData({
                  ...formData,
                  personalDetails: newPersonalData,
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
