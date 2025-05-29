import React from "react";
import { ContactPhone } from "@mui/icons-material";

export const ContactInfoSection = ({
  formData,
  setFormData,
  isEditing,
  langData,
}) => {
  return renderSection(
    <ContactPhone />,
    langData?.biodataMaster.contactDetails || "Contact Details",
    <div className="info-grid">
      {formData.contactDetails.map((field, index) => (
        <div key={index} className="detail-field animated-field">
          <label>{field.label}:</label>
          {isEditing ? (
            <input
              className="input-field-edit"
              type= "text"
              value={field.value}
              onChange={(e) => {
                const newContactData = [...formData.contactDetails];
                newContactData[index].value = e.target.value;
                setFormData({
                  ...formData,
                  contactDetails: newContactData,
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
