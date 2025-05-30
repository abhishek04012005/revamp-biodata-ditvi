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

  return (
    <div className="detail-section">
      <div className="section-header">
        <div className="section-icon">
          <School />
        </div>
        <div className="section-title">
          <h2>{langData?.biodataMaster.educationDetails}</h2>
        </div>
      </div>

      <div className="section-content">
        {formData.educationDetails.map((educationGroup, index) => (
          <div key={index} className="detail-group animated-card">
            <div className="detail-group-header">
              <h3>{`${langData?.placeholders.education} ${
                formData.educationDetails.length - index
              }`}</h3>
              {isEditing && index > 0 && (
                <button
                  className="remove-btn floating"
                  onClick={() => handleRemoveEducation(index)}
                >
                  <Delete />
                </button>
              )}
            </div>
            <div className="detail-fields">
              {educationGroup.map((field, fieldIndex) => (
                <div key={fieldIndex} className="detail-field">
                  <label className="detail-label">{field.label}:</label>
                  {isEditing ? (
                    <input
                      className="detail-field input"
                      type="text"
                      value={field.value}
                      onChange={(e) => {
                        const newEducationData = [...formData.educationDetails];
                        newEducationData[index][fieldIndex].value =
                          e.target.value;
                        setFormData({
                          ...formData,
                          educationDetails: newEducationData,
                        });
                      }}
                      placeholder={`${field.label}`}
                    />
                  ) : (
                    <span className="detail-value">{field.value}</span>
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
    </div>
  );
};
