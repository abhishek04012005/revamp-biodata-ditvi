import React, { useState } from "react";
import "./BiodataMaster.css";
import BackgroundBiodata1111 from "../../assets/background/1111.svg";
import {
  Work,
  School,
  People,
  ContactPhone,
  FormatSize,
  Palette,
  Settings,
} from "@mui/icons-material";
import AdminHeader from "../../components/Admin/AdminHeader/AdminHeader";

const BiodataMaster = () => {
  // State for dynamic styles
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
        <AdminHeader />

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
      border-color: ${styles.photoFrame.borderColor} !important;
    }
    .biodata-master h3 {
      font-size: ${styles.headings.fontSize} !important;
      color: ${styles.headings.color} !important;
    }
    .biodata-master th {
      font-size: ${styles.tableHeaders.fontSize} !important;
      color: ${styles.tableHeaders.color} !important;
      background-color: ${styles.table.headerColor} !important;
    }
    .biodata-master td {
      font-size: ${styles.tableData.fontSize} !important;
      color: ${styles.tableData.color} !important;
    }
    .biodata-master .biodata-master-section-icon {
      font-size: ${styles.icons.fontSize} !important;
      color: ${styles.icons.color} !important;
    }
    .biodata-master .biodata-master-bio-table {
      --row-gap: ${styles.table.rowGap};
    }
    .biodata-master .biodata-master-bio-table tbody tr {
      background-color: ${styles.table.rowColor} !important;
    }
    .biodata-master .biodata-master-bio-table tbody tr:nth-child(even) {
      background-color: ${styles.table.rowColor}80 !important;
    }
    .biodata-master .biodata-master-bio-table thead tr,
    .biodata-master .biodata-master-bio-table tbody tr:first-child {
      background-color: ${styles.table.headerColor} !important;
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
                    <img src="" alt="Profile" />
                  </div>
                  <div className="biodata-master-name-text">
                    <h3>Stark</h3>
                  </div>
                </div>
                {/* Personal Information  */}
                <div className="biodata-master-personal-info">
                  <table className="biodata-master-bio-table personal-table">
                    <tbody>
                      <tr>
                        <td className="biodata-master-personal-icon-alignment">
                          Religion
                        </td>
                        <td>Hindu</td>
                      </tr>
                      <tr>
                        <td className="biodata-master-personal-icon-alignment">
                          Religion
                        </td>
                        <td>Hindu</td>
                      </tr>
                      <tr>
                        <td className="biodata-master-personal-icon-alignment">
                          Religion
                        </td>
                        <td>Hindu</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Professional Section  */}
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
                      <td>Google</td>
                      <td>Manager</td>
                      <td>3+</td>
                      <td>12 LPA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Education Details  */}
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

                    <tr>
                      <td>B.Sc</td>
                      <td>Patna University</td>
                      <td>2018</td>
                      <td>89%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Family Section  */}

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

                    <tr>
                      <td>Brother</td>
                      <td>ANkit</td>
                      <td>College</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td>Brother</td>
                      <td>ANkit</td>
                      <td>College</td>
                      <td>No</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Contact Section */}

              <div className="biodata-master-section contact-sectio">
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
                        Near B.D. College, Yarpur Yogiya Tola, Mithapur,
                        Patna-800001
                      </td>
                      <td>+919264248504</td>
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
