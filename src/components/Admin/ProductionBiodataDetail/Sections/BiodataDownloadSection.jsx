import React from "react";
import { Download, Description } from "@mui/icons-material";

export const BiodataDownloadSection = ({ biodataUrl, langData }) => {
  const handleDownload = () => {
    window.open(biodataUrl, "_blank");
  };

  return (
    <div className="content-grid">
      {renderSection(
        <Description />,
        langData?.biodataMaster.uploadedBiodata || "Uploaded Biodata",
        <div className="profile-section-dowloand">
          <button className="download-btn" onClick={handleDownload}>
            <Download />
            {langData?.placeholders.download || "Download Biodata"}
          </button>
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
