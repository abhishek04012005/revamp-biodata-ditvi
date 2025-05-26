import ModelTypes from "../../../json/ModelTypes";

const PreviewSection = ({ formData,  langData, modelDetails, currentStep }) => {
  const isModelTypeStudent = modelDetails.type === ModelTypes.Student.Name;

  return (
      <div className="create-biodata-preview">
            <h2>{langData.steps[currentStep]}</h2>
            <div className="preview-section">
              {/* Profile Image */}
              {formData.profileImage && (
                <section className="preview-group profile-image-preview">
                  <h3>{langData.steps[0]}</h3>
                  <div className="preview-image-container">
                    <img
                      src={formData.profileImage}
                      alt="Profile Preview"
                      className="preview-profile-image"
                    />
                  </div>
                </section>
              )}
              {/* Personal Details */}
              <section className="preview-group">
                <h3>{langData.biodataMaster.personalDetails}</h3>
                <div className="preview-details">
                  {/* Personal Data */}
                  {formData.personalDetails?.map((field, index) => (
                    <p key={index}>
                      <strong>{field.label}:</strong>{" "}
                      {field.value || "Not Provided"}
                    </p>
                  ))}
                </div>
              </section>

              {/* Professional/Examination Details */}
                <section className="preview-group">
                  <h3>{isModelTypeStudent ? 
                    langData.biodataMaster.examinationDetails : langData.biodataMaster.professionalDetails}</h3>
                  <div className="preview-details">
                    {isModelTypeStudent ? (
                      // Examination Details
                      formData.examinationDetails.map((field, index) => (
                        <p key={index}>
                          <strong>{field.label}:</strong>{" "}
                          {field.value || "Not Provided"}
                        </p>
                      ))
                    ) : (
                      // Professional Details
                      formData.professionalDetails.map((field, index) => (
                        <p key={index}>
                          <strong>{field.label}:</strong>{" "}
                          {field.value || "Not Provided"}
                        </p>
                      ))
                    )}
                  </div>
                </section>

              {/* Education Details */}
              <section className="preview-group">
                <h3>{langData.biodataMaster.educationDetails}</h3>
                <div className="preview-details">
                  {formData.educationDetails.map((eduGroup, index) => (
                    <div key={index} className="education-item">
                      <h4>
                        Education {formData.educationDetails.length - index}
                      </h4>
                      {eduGroup.map((field, fieldIndex) => (
                        <p key={fieldIndex}>
                          <strong>{field.label}:</strong>{" "}
                          {field.value || "Not Provided"}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </section>

              {/* Family Details */}
              <section className="preview-group">
                <h3>{langData.biodataMaster.familyDetails}</h3>
                <div className="preview-details">
                  {/* Parents Section */}
                  {["father", "mother"].map((relation) => (
                    <div key={relation} className="family-item">
                      <h4>{formData.familyDetails?.[relation]?.label}</h4>
                      <p>
                        <strong>{langData.placeholders.name}:</strong>{" "}
                        {formData.familyDetails?.[relation]?.value?.name ||
                          "Not Provided"}
                      </p>
                      <p>
                        <strong>{langData.placeholders.occupation}:</strong>{" "}
                        {formData.familyDetails?.[relation]?.value
                          ?.occupation || "Not Provided"}
                      </p>
                    </div>
                  ))}

                  {/* Siblings Section */}
                  {["brothers", "sisters"].map((relation) => (
                    <div key={relation} className="family-item">
                      <h4>{formData.familyDetails?.[relation]?.label}</h4>
                      {formData.familyDetails?.[relation]?.value?.map(
                        (sibling, idx) => (
                          <div key={idx} className="sibling-item">
                            <p>
                              <strong>{langData.placeholders.name}:</strong>{" "}
                              {sibling?.name || "Not Provided"}
                            </p>
                            <p>
                              <strong>{langData.placeholders.occupation}:</strong>{" "}
                              {sibling?.occupation || "Not Provided"}
                            </p>
                            <p>
                              <strong>{langData.placeholders.married}:</strong>{" "}
                              {sibling?.married || "Not Provided"}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Details */}
              <section className="preview-group">
                <h3>{langData.biodataMaster.contactDetails}</h3>
                <div className="preview-details">
                  {formData.contactDetails.map((field, index) => (
                    <p key={index}>
                      <strong>{field.label}:</strong>{" "}
                      {field.value || "Not Provided"}
                    </p>
                  ))}
                </div>
              </section>
            </div>
          </div>
  );
};

export default PreviewSection;