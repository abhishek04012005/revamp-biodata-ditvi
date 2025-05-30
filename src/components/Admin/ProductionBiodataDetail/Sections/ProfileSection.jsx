import { Person, CloudUpload, Download } from "@mui/icons-material";

export const ProfileSection = ({
  formData,
  isEditing,
  handleImageChange,
  langData,
}) => {
  const handleDownload = (photoUrl) => {
    window.open(photoUrl, "_blank");
  };

  return (
    <div className="content-grid">
      {renderSection(
        <Person />,
        langData?.biodataMaster.profileImage || "Profile Image",
        <div className="profile-section">
          <div className="profile-image-container">
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt={formData.userDetails?.name || "Profile"}
                className="profile-image"
              />
            ) : (
              <div className="profile-placeholder">
                <Person />
              </div>
            )}

            {isEditing && (
              <div className="image-upload-overlay">
                <CloudUpload />
                <span>{langData?.placeholders.uploadNewImage}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                />
              </div>
            )}
          </div>
          <div className="profile-section-dowloand">
            <button
              className="download-btn"
              onClick={() => handleDownload(formData.profileImage)}
            >
              <Download />
              Profile Photo
            </button>
          </div>
        </div>
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
