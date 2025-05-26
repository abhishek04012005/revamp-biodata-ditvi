const EducationDetailsSection = ({ formData, setFormData, langData, currentStep}) => {

  const MAXIMUM_EDUCATION_GROUPS = 5;

  const handleAddEducation = () => {
    if (formData.educationDetails.length < MAXIMUM_EDUCATION_GROUPS) {
      setFormData((prev) => ({
        ...prev,
        educationDetails: [
          langData.education.map(({ label }) => ({ label, value: "" })),
          ...prev.educationDetails,
        ],
      }));
    }
  };

  const handleDeleteEducation = (indexToDelete) => {
    if (formData.educationDetails.length > 1) {
      setFormData((prev) => ({
        ...prev,
        educationDetails: prev.educationDetails.filter(
          (_, index) => index !== indexToDelete
        ),
      }));
    }
  };

  return (
     <div className="create-biodata-section">
              <h2>{langData.steps[currentStep]}</h2>
              {formData.educationDetails.length < MAXIMUM_EDUCATION_GROUPS && (
                <button
                  type="button"
                  className="create-biodata-add-btn"
                  onClick={handleAddEducation}
                >
                  + Add Education ({5 - formData.educationDetails.length}{" "}
                  remaining)
                </button>
              )}

              {formData.educationDetails.map((educationGroup, index) => (
                <div key={index} className="education-group">
                  <div className="education-header">
                    <h3>
                      Education {formData.educationDetails.length - index}
                    </h3>
                  </div>
                  <div className="education-inputs">
                    {educationGroup.map((field, fieldIndex) => (
                      <div className="create-biodata-label-input">
                        <label className="create-biodata-label">
                          {field.label}:
                        </label>
                        <input
                          key={fieldIndex}
                          type="text"
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={(e) => {
                            const newEducationData =
                              formData.educationDetails.map((group, i) =>
                                i === index
                                  ? group.map((f, fi) =>
                                      fi === fieldIndex
                                        ? { ...f, value: e.target.value }
                                        : f
                                    )
                                  : group
                              );
                            setFormData({
                              ...formData,
                              educationDetails: newEducationData,
                            });
                          }}
                          required
                        />
                      </div>
                    ))}
                    {formData.educationDetails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteEducation(index)}
                        className="create-biodata-delete-btn"
                      >
                        Remove Education{" "}
                        {formData.educationDetails.length - index}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
  );
};

export default EducationDetailsSection;