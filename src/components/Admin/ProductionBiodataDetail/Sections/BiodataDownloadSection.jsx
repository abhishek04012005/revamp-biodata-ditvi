import React from "react";
import { Download, Description } from "@mui/icons-material";

export const BiodataDownloadSection = ({ biodataUrl, langData }) => {
  const handleDownload = () => {
    window.open(biodataUrl, "_blank");
  };

  return (
    <div className="detail-section">
      <div className="section-header">
        <div className="section-icon">
          <Description />
        </div>
        <div className="section-title">
          <h2>{langData?.biodataMaster.uploadedBiodata}</h2>
        </div>
      </div>

      <div className="download-section">
        <div className="file-info">
          <div className="file-icon">
            <Description />
          </div>
          <div className="file-details">
            <p className="file-name">
              {langData?.placeholders.uploadedBiodata}
            </p>
            <p className="file-type">PDF Document</p>
          </div>
        </div>
        <button className="download-btn" onClick={handleDownload}>
          <Download />
          <span>{langData?.placeholders.download}</span>
        </button>
      </div>
    </div>
  );
};
