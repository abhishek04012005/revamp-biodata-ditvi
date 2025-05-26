const ProfileImageSection = ({ formData, handleImageChange, langData, currentStep }) => {
  
  return (
          <div className="create-biodata-section">
            <h2>{langData.steps[currentStep]}</h2>
            <div className="create-biodata-image-upload-container">
              <label className="create-biodata-image-upload-label">
                <input
                  type="file"
                  accept="image/*"
                  className="create-biodata-image-input"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <span className="create-biodata-upload-button">
                  {formData.profileImage ? "Change Image" : "Upload Image"}
                </span>
              </label>
              {formData.profileImage && (
                <div className="create-biodata-image-preview-container">
                  <div className="create-biodata-image-preview">
                    <img
                      src={formData.profileImage}
                      alt="Profile Previw"
                      className="create-biodata-preview-image"
                    />
                  </div>
                  {/* <button
                    type="button"
                    className="create-biodata-remove-image-btn"
                    onClick={() => fileInputRef.current.click()}
                  >
                  </button> */}
                </div>
              )}
              <div className="create-biodata-image-requirements">
                <small>
                  * Accepted formats: JPG, PNG, JPEG
                  <br />
                  * Maximum size: 1MB
                  <br />* Recommended dimensions: 400x400px
                </small>
              </div>
            </div>
          </div>
  );
};

export default ProfileImageSection;