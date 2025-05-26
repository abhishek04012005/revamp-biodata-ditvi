const ContactDetailsSection = ({ formData, setFormData, langData, currentStep}) => {

  return (
 <div className="create-biodata-section">
                <h2>{langData.steps[currentStep]}</h2>
                {formData.contactDetails.map((field, index) => (
                  <div key={index} className="create-biodata-label-input">
                    <label className="create-biodata-label">{field.label}:</label>
                    {field.label.toLowerCase().includes('address') ? (
                      <textarea
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => {
                          const newContactDetails = [...formData.contactDetails];
                          newContactDetails[index].value = e.target.value;
                          setFormData({
                            ...formData,
                            contactDetails: newContactDetails,
                          });
                        }}
                        required
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => {
                          const newContactDetails = [...formData.contactDetails];
                          newContactDetails[index].value = e.target.value;
                          setFormData({
                            ...formData,
                            contactDetails: newContactDetails,
                          });
                        }}
                        required
                      />
                    )}
                  </div>
                ))}
              </div>
  );
};

export default ContactDetailsSection;