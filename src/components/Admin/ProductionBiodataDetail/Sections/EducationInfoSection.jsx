import React from "react";
import { School, Add, Delete } from "@mui/icons-material";
import { MAXIMUM_EDUCATION_GROUPS } from "../../../../utils/Constants";

export const EducationInfoSection = ({
  formData,
  setFormData,
  isEditing,
  langData,
}) => {
  const handleAddEducation = () => {
    const emptyEducation = langData.education.map(({ label }) => ({
      label,
      value: "",
    }));

    if (formData.educationDetails.length < MAXIMUM_EDUCATION_GROUPS) {
      setFormData((prev) => ({
        ...prev,
        educationDetails: [...prev.educationDetails, emptyEducation],
      }));
    }
  };

  const handleRemoveEducation = (index) => {
    if (formData.educationDetails.length > 1) {
      setFormData((prev) => ({
        ...prev,
        educationDetails: prev.educationDetails.filter((_, i) => i !== index),
      }));
    }
  };

  return renderSection(
    <School />,
    langData?.biodataMaster.educationDetails || "Education Details",
    <div className="education-groups">
      {formData.educationDetails.map((educationGroup, groupIndex) => (
        <div key={groupIndex} className="detail-group animated-card">
          {isEditing && groupIndex > -1 && (
            <div className="remove-button-section">
              <button
                className="remove-education-btn"
                onClick={() => handleRemoveEducation(groupIndex)}
              >
                <Delete />
                {`${langData?.placeholders.removeEduction}  ${
                  formData.educationDetails.length - groupIndex
                }`}
              </button>
            </div>
          )}

          <div className="group-header">
            <h3>{`${langData?.placeholders.education} ${
              formData.educationDetails.length - groupIndex
            }`}</h3>
          </div>
          <div className="info-grid">
            {educationGroup.map((field, fieldIndex) => (
              <div key={fieldIndex} className="detail-field animated-field">
                <label>{field.label}:</label>
                {isEditing ? (
                  <input
                    className="input-field-edit"
                    type="text"
                    value={field.value}
                    onChange={(e) => {
                      const newEducationData = [...formData.educationDetails];
                      newEducationData[groupIndex][fieldIndex].value =
                        e.target.value;
                      setFormData({
                        ...formData,
                        educationDetails: newEducationData,
                      });
                    }}
                    placeholder={`${field.label}`}
                  />
                ) : (
                  <span className="field-value">{field.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {isEditing &&
        formData.educationDetails.length < MAXIMUM_EDUCATION_GROUPS && (
          <button className="add-btn floating" onClick={handleAddEducation}>
            <Add /> {langData?.placeholders.addEducation}
          </button>
        )}
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
