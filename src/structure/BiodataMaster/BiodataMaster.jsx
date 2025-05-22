import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BiodataMaster.css";
import BackgroundBiodata1111 from "../../assets/background/1111.svg";
import { ProductionRequestStorage } from "../../supabase/ProductionRequest";
import { BIODATA_THEME_1111 } from "../../json/biodataMaster";

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
    photoFrame: {
      borderColor: "#FF8C42",
    },
    headings: {
      fontSize: "1.5rem",
      color: "#2c3e50",
    },
    tableHeaders: {
      fontSize: "1rem",
      color: "#34495e",
    },
    tableData: {
      fontSize: "0.9rem",
      color: "#2d3436",
    },
    icons: {
      fontSize: "24px",
      color: "#FF8C42",
    },
    table: {
      rowGap: "8px",
      rowColor: "#f8f9fa",
      headerColor: "#e9ecef",
    },
  });

  // Style control panel toggle
  const [showControls, setShowControls] = useState(false);

  // Handle style changes
  const handleStyleChange = (element, property, value) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [element]: {
        ...prevStyles[element],
        [property]: value,
      },
    }));
  };

  return (
    <>
      <div className="biodata-master">
        {/* Style Control Panel */}
        <div className="style-controls-toggle">
          <button
            className="toggle-button"
            onClick={() => setShowControls(!showControls)}
          >
            <Settings />
            Style Controls
          </button>
        </div>

        {showControls && (
          <div className="style-controls-panel">
            <div className="control-section">
              <h4>Photo Frame</h4>
              <div className="control-group">
                <div className="control-item">
                  <label>
                    <Palette /> Border Color
                    <input
                      type="color"
                      value={styles.photoFrame.borderColor}
                      onChange={(e) =>
                        handleStyleChange(
                          "photoFrame",
                          "borderColor",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="control-section">
              <h4>Heading Styles (h3)</h4>
              <div className="control-group">
                <div className="control-item">
                  <label>
                    <FormatSize /> Font Size
                    <input
                      type="range"
                      min="14"
                      max="32"
                      value={parseInt(styles.headings.fontSize)}
                      onChange={(e) =>
                        handleStyleChange(
                          "headings",
                          "fontSize",
                          `${e.target.value}px`
                        )
                      }
                    />
                  </label>
                </div>
                <div className="control-item">
                  <label>
                    <Palette /> Color
                    <input
                      type="color"
                      value={styles.headings.color}
                      onChange={(e) =>
                        handleStyleChange("headings", "color", e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="control-section">
              <h4>Table Headers (th)</h4>
              <div className="control-group">
                <div className="control-item">
                  <label>
                    <FormatSize /> Font Size
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={parseInt(styles.tableHeaders.fontSize)}
                      onChange={(e) =>
                        handleStyleChange(
                          "tableHeaders",
                          "fontSize",
                          `${e.target.value}px`
                        )
                      }
                    />
                  </label>
                </div>
                <div className="control-item">
                  <label>
                    <Palette /> Color
                    <input
                      type="color"
                      value={styles.tableHeaders.color}
                      onChange={(e) =>
                        handleStyleChange(
                          "tableHeaders",
                          "color",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="control-section">
              <h4>Table Data (td)</h4>
              <div className="control-group">
                <div className="control-item">
                  <label>
                    <FormatSize /> Font Size
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={parseInt(styles.tableData.fontSize)}
                      onChange={(e) =>
                        handleStyleChange(
                          "tableData",
                          "fontSize",
                          `${e.target.value}px`
                        )
                      }
                    />
                  </label>
                </div>
                <div className="control-item">
                  <label>
                    <Palette /> Color
                    <input
                      type="color"
                      value={styles.tableData.color}
                      onChange={(e) =>
                        handleStyleChange("tableData", "color", e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="control-section">
              <h4>Icons</h4>
              <div className="control-group">
                <div className="control-item">
                  <label>
                    <FormatSize /> Icon Size
                    <input
                      type="range"
                      min="16"
                      max="40"
                      value={parseInt(styles.icons.fontSize)}
                      onChange={(e) =>
                        handleStyleChange(
                          "icons",
                          "fontSize",
                          `${e.target.value}px`
                        )
                      }
                    />
                  </label>
                </div>
                <div className="control-item">
                  <label>
                    <Palette /> Icon Color
                    <input
                      type="color"
                      value={styles.icons.color}
                      onChange={(e) =>
                        handleStyleChange("icons", "color", e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="control-section">
              <h4>Table Styling</h4>
              <div className="control-group">
                <div className="control-item">
                  <label>
                    <FormatSize /> Row Spacing
                    <input
                      type="range"
                      min="0"
                      max="24"
                      value={parseInt(styles.table.rowGap)}
                      onChange={(e) =>
                        handleStyleChange(
                          "table",
                          "rowGap",
                          `${e.target.value}px`
                        )
                      }
                    />
                  </label>
                </div>
                <div className="control-item">
                  <label>
                    <Palette /> Row Background
                    <input
                      type="color"
                      value={styles.table.rowColor}
                      onChange={(e) =>
                        handleStyleChange("table", "rowColor", e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="control-section">
              <h4>Table Header Background</h4>
              <div className="control-group">
                <div className="control-item">
                  <label>
                    <Palette /> Header Background
                    <input
                      type="color"
                      value={styles.table.headerColor}
                      onChange={(e) =>
                        handleStyleChange(
                          "table",
                          "headerColor",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

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
      font-size: ${BIODATA_THEME_1111.TABLE.HEADER.FONT_SIZE} !important;
      color: ${BIODATA_THEME_1111.TABLE.HEADER.COLOR} !important;
      background-color: ${BIODATA_THEME_1111.TABLE.HEADER.BACKGROUND_COLOR} !important;
    }
    .biodata-master td {
      font-size: ${BIODATA_THEME_1111.TABLE.DATA.FONT_SIZE} !important;
      color: ${BIODATA_THEME_1111.TABLE.DATA.COLOR} !important;
    }
    .biodata-master .biodata-master-section-icon {
      font-size: ${BIODATA_THEME_1111.ICONS.FONT_SIZE} !important;
      color: ${BIODATA_THEME_1111.ICONS.COLOR} !important;
    }
    .biodata-master .biodata-master-bio-table {
      --row-gap: ${BIODATA_THEME_1111.TABLE.ROW_GAP};
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

              {/* Professional/Examination Section */}
            {formData?.modelDetails?.type === 'Student' ? (
              <div className="biodata-master-section examination-table">
                <div className="biodata-master-section-title">
                  <span className="biodata-master-flex-section">
                    <Work className="biodata-master-section-icon" />
                    <h3>Examination Preparation Details</h3>
                  </span>
                </div>
                <table className="biodata-master-bio-table">
                  <tbody>
                    <tr>
                      {formData?.examinationDetails?.map((field, index) => (
                        <th key={index}>{field.label}</th>
                      ))}
                    </tr>
                    <tr>
                      {formData?.examinationDetails?.map((field, index) => (
                        <td key={index}>{field.value || "Not Provided"}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
	          <div className= "biodata-master-section professional-table">
                <div className="biodata-master-section-title">
                  <span className="biodata-master-flex-section">
                    <Work className="biodata-master-section-icon" />
                    <h3>Professional Details</h3>
                  </span>
                </div>
                <table className="biodata-master-bio-table">
                  <tbody>
                    <tr>
                      {formData?.professionalDetails?.map((field, index) => (
                        <th key={index}>{field.label}</th>
                      ))}
                    </tr>
                    <tr>
                      {formData?.professionalDetails?.map((field, index) => (
                        <td key={index}>{field.value || "Not Provided"}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

)}

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
                      {formData?.educationDetails?.[0]?.map((field, index) => (
                        <th key={index}>{field.label}</th>
                      ))}
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
                                  formData.familyDetails.brothers.value.length -
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
                                  formData.familyDetails.brothers.value.length -
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
                                  formData.familyDetails.brothers.value.length -
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
                                  formData.familyDetails.sisters.value.length -
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
                                  formData.familyDetails.sisters.value.length -
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
                                  formData.familyDetails.sisters.value.length -
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
      </div>
    </>
  );
};

export default BiodataMaster;
