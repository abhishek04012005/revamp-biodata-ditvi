const ProfileImageSection = ({ formData, setFormData, langData, currentStep }) => {
  return (
            <div className="create-biodata-section">
              <h2>{langData.steps[currentStep]}</h2>
              {formData.personalDetails.map((field, index) => (
                <>
                  <div className="create-biodata-label-input">
                    <label className="create-biodata-label">
                      {field.label}:
                    </label>
                    <input
                      key={index}
                      type="text"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => {
                        const newPersonalData = [...formData.personalDetails];
                        newPersonalData[index].value = e.target.value;
                        setFormData({
                          ...formData,
                          personalDetails: newPersonalData,
                        });
                      }}
                      required
                    />
                  </div>
                </>
              ))}
            </div>
  );
};

export default ProfileImageSection;