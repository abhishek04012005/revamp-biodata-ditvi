import ModelTypes from "../../../json/ModelTypes";

const ProfessionalDetailsSection = ({ formData, setFormData, langData,modelDetails, currentStep }) => {
  console.log("ProfessionalDetailsSection", formData.examinationDetails);
  return (          
        <div className="create-biodata-section">
            <h2>{langData.steps[currentStep]}</h2>
            {modelDetails?.type === ModelTypes.Student.Name ? (
              <div className="professional-inputs">
                {formData.examinationDetails.map((field, index) => (
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
                        const newExaminationDetails = [
                          ...formData.examinationDetails,
                        ];
                        newExaminationDetails[index].value = e.target.value;
                        setFormData({
                          ...formData,
                          examinationDetails: newExaminationDetails,
                        });
                      }}
                      required
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="professional-inputs">
                {formData.professionalDetails.map((field, index) => (
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
                        const newProfessionalDetails = [
                          ...formData.professionalDetails,
                        ];
                        newProfessionalDetails[index].value = e.target.value;
                        setFormData({
                          ...formData,
                          professionalDetails: newProfessionalDetails,
                        });
                      }}
                      required
                    />
                  </div>
                ))}
              </div>
            )}
          </div>);
};

export default ProfessionalDetailsSection;