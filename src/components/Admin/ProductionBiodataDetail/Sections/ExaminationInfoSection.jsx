import { School } from "@mui/icons-material";

export const ExaminationInfoSection = ({
  formData,
  setFormData,
  isEditing,
  langData,
}) => {
  return renderSection(
    <School />,
    langData?.biodataMaster.examinationDetails || "Examination Details",
    <div className="info-grid">
      {formData.examinationDetails.map((field, index) => {
        return (
          <div key={index} className="detail-field animated-field">
            <label>{field?.label || "Label"}:</label>
            {isEditing ? (
              <input
                className="input-field-edit"
                type="text"
                value={field?.value || ""}
                onChange={(e) => {
                  const newExaminationData = [...formData.examinationDetails];
                  newExaminationData[index] = {
                    ...newExaminationData[index],
                    value: e.target.value,
                  };
                  setFormData({
                    ...formData,
                    examinationDetails: newExaminationData,
                  });
                }}
                placeholder={field?.label}
              />
            ) : (
              <span className="field-value">{field.value}</span>
            )}
          </div>
        );
      })}
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
