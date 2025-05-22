import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BiodataMaster.css";
import BackgroundBiodata1111 from "../../assets/background/1111.svg";
import { ProductionRequestStorage } from "../../supabase/ProductionRequest";
import { BIODATA_THEME_1111 } from "../../json/biodataMaster";
import WatermarkLogo from "../../assets/watermark/logo.png";

import {
  Work,
  School,
  People,
  ContactPhone,
  FormatSize,
  Palette,
  Settings,
} from "@mui/icons-material";

const BiodataMaster = () => {
  const { requestId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [requestNumber, setRequestNumber] = useState(null);

  useEffect(() => {
    fetchRequestData();
  }, [requestId]);

  const fetchRequestData = async () => {
    try {
      setIsLoading(true);
      const response = await ProductionRequestStorage.getProductionRequestById(
        requestId
      );

      if (response) {
        const initialFormData = {
          profileImage: response.profile_url,
          biodataUrl: response.biodata_url,
          userDetails: response.user_details,
          modelDetails: response.model_details,
          personalDetails: response.personal_details,
          professionalDetails: response.professional_details,
          examinationDetails: response.examination_details,
          educationDetails: response.education_details,
          familyDetails: response.family_details,
          contactDetails: response.contact_details,
        };

        setRequestNumber(response.request_number);
        setFormData(initialFormData);
        setOriginalData(initialFormData);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [styles, setStyles] = useState({
    headings: {
      fontSize: "1.5rem",
    },
    table: {
      headerFontSize: "1rem",
      dataFontSize: "0.9rem",
      rowGap: "8px",
    },
  });

  const handlePrint = (withWatermark = false) => {
    // Store current page styles
    const originalContent = document.body.innerHTML;

    // Get only the biodata container content
    const biodataContent = document.querySelector(
      ".biodata-master-a4-container"
    ).innerHTML;

    // Create print-specific styles with theme colors
    const printStyles = `
    
         <script>
          document.title = "Biodata";
        </script>
        <style>
            @page {
                size: A4;
                margin: 0;
            }
            body {
                margin: 0;
                padding: 0;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            .biodata-master-a4-container {
                width: 210mm;
                min-height: 297mm;
                margin: 0;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                padding: 0;
                background-image: url("${BackgroundBiodata1111}");
            }

            /* Theme-specific styles */
            .biodata-master .biodata-master-photo-frame {
                border-color: ${
                  BIODATA_THEME_1111.PHOTO_FRAME.BORDER_COLOR
                } !important;
            }
            .biodata-master h3 {
                font-size: ${BIODATA_THEME_1111.HEADINGS.FONT_SIZE} !important;
                color: ${BIODATA_THEME_1111.HEADINGS.COLOR} !important;
            }
            .biodata-master th {
                font-size: ${styles.table.headerFontSize} !important;
                color: ${BIODATA_THEME_1111.TABLE.HEADER.COLOR} !important;
                background-color: ${
                  BIODATA_THEME_1111.TABLE.HEADER.BACKGROUND_COLOR
                } !important;
            }
            .biodata-master td {
                font-size: ${styles.table.dataFontSize} !important;
                color: ${BIODATA_THEME_1111.TABLE.DATA.COLOR} !important;
            }
            .biodata-master .biodata-master-section-icon {
                color: ${BIODATA_THEME_1111.ICONS.COLOR} !important;
            }
            .biodata-master .biodata-master-bio-table tbody tr {
                background-color: ${
                  BIODATA_THEME_1111.TABLE.DATA.BACKGROUND_COLOR
                } !important;
            }
            .biodata-master .biodata-master-bio-table tbody tr:nth-child(even) {
                background-color: ${
                  BIODATA_THEME_1111.TABLE.DATA.ALTERNATE_BACKGROUND_COLOR
                } !important;
            }
            .biodata-master .biodata-master-bio-table thead tr,
            .biodata-master .biodata-master-bio-table tbody tr:first-child {
                background-color: ${
                  BIODATA_THEME_1111.TABLE.HEADER.BACKGROUND_COLOR
                } !important;
            }
            .biodata-master-bio-table td,
            .biodata-master-bio-table th {
                padding: ${styles.table.rowGap};
                border-bottom: ${styles.table.rowGap} solid transparent;
            }

            .img-watermark {
                display: ${
                  withWatermark ? "block !important" : "none !important"
                };
            }

            .img-watermark img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: contain;
                opacity: 0.3;
                transform: rotate(-45deg);
            }

            @media print {
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
                .img-watermark {
                    display: ${
                      withWatermark ? "block !important" : "none !important"
                    };
                }
            }
        </style>
    `;

    // Create a new container with watermark
    const printContent = `
        <div class="biodata-master">
            <div class="biodata-master-a4-container">
                
                ${
                  withWatermark
                    ? `
                    <div class="img-watermark">
                          <img src="${WatermarkLogo}" alt="watermark" style="width: 100%; height: 100%; object-fit: contain;"/>
                    </div>
                `
                    : ""
                }
                ${biodataContent}
            </div>
        </div>
    `;

    // Replace page content with biodata content and print styles
    document.body.innerHTML = printStyles + printContent;

    document.title = `Biodata - ${requestNumber} ${
      withWatermark ? "Watermarked" : "Original"
    }`;

    // Print after a small delay to ensure styles are applied
    setTimeout(() => {
      window.print();
      // Restore original content
      document.body.innerHTML = originalContent;
      // Reattach event listeners and reload page
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <div className="biodata-master">
        <div className="biodata-master-container">
          <div className="style-controls-sidebar"></div>
          <div className="biodata-master-biodata-page">
            {/* Apply dynamic styles to elements */}
            <style>
              {`
    .biodata-master .biodata-master-photo-frame {
      border-color: ${BIODATA_THEME_1111.PHOTO_FRAME.BORDER_COLOR} !important;
    }
    .biodata-master h3 {
      font-size: ${BIODATA_THEME_1111.HEADINGS.FONT_SIZE} !important;
      color: ${BIODATA_THEME_1111.HEADINGS.COLOR} !important;
    }
    .biodata-master th {
      font-size: ${styles.table.headerFontSize} !important;
      color: ${BIODATA_THEME_1111.TABLE.HEADER.COLOR} !important;
      background-color: ${BIODATA_THEME_1111.TABLE.HEADER.BACKGROUND_COLOR} !important;
    }
    .biodata-master td {
      font-size: ${styles.table.dataFontSize} !important;
      color: ${BIODATA_THEME_1111.TABLE.DATA.COLOR} !important;
    }
    .biodata-master .biodata-master-section-icon {
      font-size: ${BIODATA_THEME_1111.ICONS.FONT_SIZE} !important;
      color: ${BIODATA_THEME_1111.ICONS.COLOR} !important;
    }
    .biodata-master .biodata-master-bio-table {
      --row-gap: ${styles.table.rowGap};
    }
    .biodata-master .biodata-master-bio-table tbody tr {
      background-color: ${BIODATA_THEME_1111.TABLE.DATA.BACKGROUND_COLOR} !important;
    }
    .biodata-master .biodata-master-bio-table tbody tr:nth-child(even) {
      background-color: ${BIODATA_THEME_1111.TABLE.DATA.ALTERNATE_BACKGROUND_COLOR} !important;
    }
    .biodata-master .biodata-master-bio-table thead tr,
    .biodata-master .biodata-master-bio-table tbody tr:first-child {
      background-color: ${BIODATA_THEME_1111.TABLE.HEADER.BACKGROUND_COLOR} !important;
    }
      .biodata-master-bio-table td,
    .biodata-master-bio-table th {
      padding: 12px;
      border-bottom: ${styles.table.rowGap} solid transparent;
    }
  `}
            </style>

            {/* Existing biodata content */}
            <div
              className="biodata-master-a4-container"
              style={{
                backgroundImage: `url(${BackgroundBiodata1111})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="biodata-master-biodata-content">
                {/* Personal Section */}
                <div className="biodata-master-personal-section">
                  <div className="biodata-master-photo-section">
                    <div className="biodata-master-photo-frame">
                      <img src={formData?.profileImage} alt="Profile" />
                    </div>
                    <div className="biodata-master-name-text">
                      <h3>
                        {
                          formData?.personalDetails?.find(
                            (field) => field.label === "Name"
                          )?.value
                        }
                      </h3>
                    </div>
                  </div>
                  <div className="biodata-master-personal-info">
                    <table className="biodata-master-bio-table personal-table">
                      <tbody>
                        {formData?.personalDetails?.map(
                          (field, index) =>
                            field.label !== "Name" && (
                              <tr key={index}>
                                <td className="biodata-master-personal-icon-alignment">
                                  {field.label}
                                </td>
                                <td>{field.value || "Not Provided"}</td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Professional Section */}
                <div className="biodata-master-section professional-table">
                  <div className="biodata-master-section-title">
                    <span className="biodata-master-flex-section">
                      <Work className="biodata-master-section-icon" />
                      <h3>Professional Details</h3>
                    </span>
                  </div>
                  <table className="biodata-master-bio-table">
                    <tbody>
                      <tr>
                        <th>Company Name</th>
                        <th>Position</th>
                        <th>Years of Experience</th>
                        <th>Salary</th>
                      </tr>
                      <tr>
                        {formData?.professionalDetails?.map((field, index) => (
                          <td key={index}>{field.value || "Not Provided"}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Education Details */}
                <div className="biodata-master-section education-section">
                  <div className="biodata-master-section-title">
                    <span className="biodata-master-flex-section">
                      <School className="biodata-master-section-icon" />
                      <h3>Education Details</h3>
                    </span>
                  </div>
                  <table className="biodata-master-bio-table">
                    <tbody>
                      <tr>
                        <th>Degree</th>
                        <th>Institution</th>
                        <th>Year</th>
                        <th>Score</th>
                      </tr>
                      {formData?.educationDetails?.map((education, index) => (
                        <tr key={index}>
                          {education.map((field, fieldIndex) => (
                            <td key={fieldIndex}>
                              {field.value || "Not Provided"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Family Section */}
                <div className="biodata-master-section family-section">
                  <div className="biodata-master-section-title">
                    <span className="biodata-master-flex-section">
                      <People className="biodata-master-section-icon" />
                      <h3>Family Details</h3>
                    </span>
                  </div>
                  <table className="biodata-master-bio-table">
                    <tbody>
                      <tr>
                        <th>Relation</th>
                        <th>Name</th>
                        <th>Occupation</th>
                        <th>Married</th>
                      </tr>
                      {/* Father's Details */}
                      <tr>
                        <td>Father</td>
                        <td>
                          {formData?.familyDetails?.father?.value?.name ||
                            "Not Provided"}
                        </td>
                        <td>
                          {formData?.familyDetails?.father?.value?.occupation ||
                            "Not Provided"}
                        </td>
                        <td>-</td>
                      </tr>
                      {/* Mother's Details */}
                      <tr>
                        <td>Mother</td>
                        <td>
                          {formData?.familyDetails?.mother?.value?.name ||
                            "Not Provided"}
                        </td>
                        <td>
                          {formData?.familyDetails?.mother?.value?.occupation ||
                            "Not Provided"}
                        </td>
                        <td>-</td>
                      </tr>
                      {/* Brothers Details in one row */}
                      {formData?.familyDetails?.brothers?.value?.length > 0 && (
                        <tr>
                          <td>Brothers</td>
                          <td>
                            {formData.familyDetails.brothers.value.map(
                              (brother, index) => (
                                <div
                                  key={`brother-${index}`}
                                  className="sibling-info"
                                >
                                  {brother.name || "Not Provided"}
                                  {index <
                                    formData.familyDetails.brothers.value
                                      .length -
                                      1 && ", "}
                                </div>
                              )
                            )}
                          </td>
                          <td>
                            {formData.familyDetails.brothers.value.map(
                              (brother, index) => (
                                <div
                                  key={`brother-occ-${index}`}
                                  className="sibling-info"
                                >
                                  {brother.occupation || "Not Provided"}
                                  {index <
                                    formData.familyDetails.brothers.value
                                      .length -
                                      1 && ", "}
                                </div>
                              )
                            )}
                          </td>
                          <td>
                            {formData.familyDetails.brothers.value.map(
                              (brother, index) => (
                                <div
                                  key={`brother-married-${index}`}
                                  className="sibling-info"
                                >
                                  {brother.married || "No"}
                                  {index <
                                    formData.familyDetails.brothers.value
                                      .length -
                                      1 && ", "}
                                </div>
                              )
                            )}
                          </td>
                        </tr>
                      )}
                      {/* Sisters Details in one row */}
                      {formData?.familyDetails?.sisters?.value?.length > 0 && (
                        <tr>
                          <td>Sisters</td>
                          <td>
                            {formData.familyDetails.sisters.value.map(
                              (sister, index) => (
                                <div
                                  key={`sister-${index}`}
                                  className="sibling-info"
                                >
                                  {sister.name || "Not Provided"}
                                  {index <
                                    formData.familyDetails.sisters.value
                                      .length -
                                      1 && ", "}
                                </div>
                              )
                            )}
                          </td>
                          <td>
                            {formData.familyDetails.sisters.value.map(
                              (sister, index) => (
                                <div
                                  key={`sister-occ-${index}`}
                                  className="sibling-info"
                                >
                                  {sister.occupation || "Not Provided"}
                                  {index <
                                    formData.familyDetails.sisters.value
                                      .length -
                                      1 && ", "}
                                </div>
                              )
                            )}
                          </td>
                          <td>
                            {formData.familyDetails.sisters.value.map(
                              (sister, index) => (
                                <div
                                  key={`sister-married-${index}`}
                                  className="sibling-info"
                                >
                                  {sister.married || "No"}
                                  {index <
                                    formData.familyDetails.sisters.value
                                      .length -
                                      1 && ", "}
                                </div>
                              )
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Contact Section */}
                <div className="biodata-master-section contact-details">
                  <div className="biodata-master-section-title">
                    <span className="biodata-master-flex-section">
                      <ContactPhone className="biodata-master-section-icon" />
                      <h3>Contact Details</h3>
                    </span>
                  </div>
                  <table className="biodata-master-bio-table">
                    <tbody>
                      <tr>
                        <th>Address</th>
                        <th>Mobile No.</th>
                      </tr>
                      <tr>
                        <td>
                          {formData?.contactDetails?.address || "Not Provided"}
                        </td>
                        <td>
                          {formData?.contactDetails?.mobile || "Not Provided"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="style-controls-sidebar">
            <div className="control-section">
              <div className="control-section print-controls">
                <h4 className="control-title">
                  <span className="control-icon">🖨️</span> Print Options
                </h4>
                <div className="print-buttons">
                  <button
                    className="print-btn watermark"
                    onClick={() => handlePrint(true)}
                  >
                    <span className="print-icon">📄</span>
                    <span className="print-text">
                      <span className="print-label">Watermark</span>
          
                    </span>
                  </button>
                  <button
                    className="print-btn original"
                    onClick={() => handlePrint(false)}
                  >
                    <span className="print-icon">📃</span>
                    <span className="print-text">
                      <span className="print-label">Original</span>
                      
                    </span>
                  </button>
                </div>
              </div>
              <div className="control-section">
                <h4>Font Sizes</h4>
                <div className="control-group">
                  <div className="control-item">
                    <label>
                      <FormatSize /> Table Headers
                      <div className="size-control">
                        <button
                          className="size-btn"
                          onClick={() =>
                            setStyles((prev) => ({
                              ...prev,
                              table: {
                                ...prev.table,
                                headerFontSize: `${
                                  parseInt(prev.table.headerFontSize) - 1
                                }px`,
                              },
                            }))
                          }
                        >
                          -
                        </button>
                        <span className="size-value">
                          {styles.table.headerFontSize}
                        </span>
                        <button
                          className="size-btn"
                          onClick={() =>
                            setStyles((prev) => ({
                              ...prev,
                              table: {
                                ...prev.table,
                                headerFontSize: `${
                                  parseInt(prev.table.headerFontSize) + 1
                                }px`,
                              },
                            }))
                          }
                        >
                          +
                        </button>
                      </div>
                    </label>
                  </div>
                  <div className="control-item">
                    <label>
                      <FormatSize /> Table Data
                      <div className="size-control">
                        <button
                          className="size-btn"
                          onClick={() =>
                            setStyles((prev) => ({
                              ...prev,
                              table: {
                                ...prev.table,
                                dataFontSize: `${
                                  parseInt(prev.table.dataFontSize) - 1
                                }px`,
                              },
                            }))
                          }
                        >
                          -
                        </button>
                        <span className="size-value">
                          {styles.table.dataFontSize}
                        </span>
                        <button
                          className="size-btn"
                          onClick={() =>
                            setStyles((prev) => ({
                              ...prev,
                              table: {
                                ...prev.table,
                                dataFontSize: `${
                                  parseInt(prev.table.dataFontSize) + 1
                                }px`,
                              },
                            }))
                          }
                        >
                          +
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="control-section">
                <h4>Row Spacing</h4>
                <div className="control-group">
                  <div className="control-item">
                    <label>
                      <FormatSize /> Gap
                      <div className="size-control">
                        <button
                          className="size-btn"
                          onClick={() =>
                            setStyles((prev) => ({
                              ...prev,
                              table: {
                                ...prev.table,
                                rowGap: `${parseInt(prev.table.rowGap) - 1}px`,
                              },
                            }))
                          }
                        >
                          -
                        </button>
                        <span className="size-value">
                          {styles.table.rowGap}
                        </span>
                        <button
                          className="size-btn"
                          onClick={() =>
                            setStyles((prev) => ({
                              ...prev,
                              table: {
                                ...prev.table,
                                rowGap: `${parseInt(prev.table.rowGap) + 1}px`,
                              },
                            }))
                          }
                        >
                          +
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BiodataMaster;
