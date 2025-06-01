import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BiodataMaster.css";
import { ProductionRequestStorage } from "../../supabase/ProductionRequest";
import { BIODATA_THEMES } from "../../json/biodataMaster";
import WatermarkLogo from "../../assets/watermark/logo.png";
import { getLatestStatusId } from "../../utils/StatusHelper";
import { getWhatsappMessageByStatus } from "../../messages/whatsapp/status";
import { BiodataRequestStorage } from "../../supabase/BiodataRequest";
import {
  BiodataBackgrounds,
  getBiodataBackgroundImage,
} from "../../json/BiodataBackground";
import Loader from "../Loader/Loader";
import Languages from "../../json/Languages";

import {
  Work,
  School,
  People,
  ContactPhone,
  FormatSize,
  Palette,
  Settings,
  ContentCopy,
  Check,
} from "@mui/icons-material";
import DEFAULT_STYLES from "../../json/Styles";
import { ICON_MAPPING } from "../../json/createBiodata";
import { ICON_MAPPING_HINDI } from "../../json/CreateBiodataHindi";

const BiodataMaster = () => {
  const { requestId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(1);
  const [statusArray, setStatusArray] = useState([]);
  const [formData, setFormData] = useState(null);
  const [requestNumber, setRequestNumber] = useState(null);
  const [copied, setCopied] = useState(false);
  const [styles, setStyles] = useState(DEFAULT_STYLES);
  const [modelDetails, setModelDetails] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState("1111");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchRequestData();
  }, []);

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
        setModelDetails(response.model_details);
        setSelectedBackground(response.model_details.modelNumber);
        setFormData(initialFormData);
        setStyles(response.style_settings || DEFAULT_STYLES);
        fetchStatus(response.request_number);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markCompletedProductionRequest = async () => {
    try {
      ProductionRequestStorage.updateProductionRequestById(requestId, {
        completed: true,
      });
      BiodataRequestStorage.updateStatusBiodataRequestByRequestNumber(
        requestNumber,
        [
          ...statusArray,
          {
            id: 5,
            created: new Date().toISOString(),
          },
        ]
      );
    } catch (err) {
      console.error("Error markCompletedProductionRequest ", err);
    }
  };

  const getCurrentTheme = () => {
    return BIODATA_THEMES[selectedBackground] || BIODATA_THEMES["1111"];
  };

  useEffect(() => {
    // Force style update when background changes
    const element = document.querySelector(".biodata-master");
    if (element) {
      element.style.display = "none";
      setTimeout(() => {
        element.style.display = "";
      }, 0);
    }
  }, [selectedBackground]);

  const fetchStatus = async (requestNumber) => {
    BiodataRequestStorage.getBiodataRequestByRequestNumber(requestNumber)
      .then((response) => {
        if (response) {
          setStatusArray(response.status);
          setCurrentStatus(getLatestStatusId(response.status));
        } else {
          console.error("No request found with the given request number.");
        }
      })
      .catch((error) => {
        console.error("Error fetching request:", error);
      });
  };

  const handleCopyMessage = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const isLanguageEnglish = modelDetails?.language === Languages.English.Name;

  const handlePrint = (withWatermark = false) => {
    // Mark Production Request Completed and Update Status in BiodataRequest
    if (withWatermark === false) markCompletedProductionRequest();
    // Store current page styles
    const currentTheme = getCurrentTheme();
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
                background-image: url("${getBiodataBackgroundImage(
                  selectedBackground
                )}");
            }

            /* Theme-specific styles */

 .biodata-master .biodata-master-photo-frame {
      border-color: ${currentTheme.PHOTO_FRAME.BORDER_COLOR} !important;
    }
    .biodata-master h3 {
      font-size: ${styles.name.fontSize} !important;
      color: ${currentTheme.HEADINGS.COLOR} !important;
    }

     .biodata-master-flex-section h3 {
      font-size: ${styles.headings.fontSize} !important;
    }
    .biodata-master h3 {
      color: ${getCurrentTheme().HEADINGS.COLOR} !important;
    }
    .biodata-master th {
      font-size: ${styles.table.headerFontSize} !important;
      color: ${currentTheme.TABLE.HEADER.COLOR} !important;
      background-color: ${
        currentTheme.TABLE.HEADER.BACKGROUND_COLOR
      } !important;
    }
    .biodata-master td {
      font-size: ${styles.table.dataFontSize} !important;
      color: ${currentTheme.TABLE.DATA.COLOR} !important;
    }
    .biodata-master .biodata-master-section-icon {
      color: ${currentTheme.ICONS.COLOR} !important;
    }
    .biodata-master .biodata-master-bio-table tbody tr {
      background-color: ${currentTheme.TABLE.DATA.BACKGROUND_COLOR} !important;
    }
    .biodata-master .biodata-master-bio-table tbody tr:nth-child(even) {
      background-color: ${
        currentTheme.TABLE.DATA.ALTERNATE_BACKGROUND_COLOR
      } !important;
    }
    .biodata-master .biodata-master-bio-table thead tr,
    .biodata-master .biodata-master-bio-table tbody tr:first-child {
      background-color: ${
        currentTheme.TABLE.HEADER.BACKGROUND_COLOR
      } !important;
    }
          .biodata-master-bio-table td,
    .biodata-master-bio-table th {

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

  const saveStyleSettings = async () => {
    try {
      setIsLoading(true);
      await ProductionRequestStorage.updateProductionRequestById(requestId, {
        styleSettings: styles,
      });

      setNotification({
        show: true,
        message: "Style settings saved successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error saving style settings:", error);
      setNotification({
        show: true,
        message: "Failed to save style settings",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBaseUrl = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    return `${protocol}//${host}`;
  };

  return (
    <>
      <div className="biodata-master">
        <div className="biodata-master-container">
          <div className="style-controls-sidebar">
            {formData && (
              <div className="whatsapp-message-container">
                {(() => {
                  const messages = getWhatsappMessageByStatus(currentStatus, {
                    name: formData?.userDetails?.name || "",
                    requestNumber: requestNumber || "",
                    modelNumber: formData?.modelDetails?.modelNumber || "",
                    statusLink: `${
                      process.env.REACT_APP_APPLICATION_URL || getBaseUrl()
                    }/track-status/${requestNumber}`,
                    paymentLink: `${
                      process.env.REACT_APP_APPLICATION_URL || getBaseUrl()
                    }/payment/${requestNumber}`,
                    feedbackLink: `${
                      process.env.REACT_APP_APPLICATION_URL || getBaseUrl()
                    }/feedback/${requestNumber}`,
                  });

                  return messages.map((messageData) => (
                    <div key={messageData.id} className="whatsapp-message-card">
                      <div className="whatsapp-message-header">
                        <h4>{messageData.title}</h4>
                        <button
                          className={`copy-button ${
                            copied === messageData.id ? "copied" : ""
                          }`}
                          onClick={() =>
                            handleCopyMessage(
                              messageData.message,
                              messageData.id
                            )
                          }
                        >
                          {copied === messageData.id ? (
                            <Check />
                          ) : (
                            <ContentCopy />
                          )}
                        </button>
                      </div>
                      <div className="whatsapp-message-content">
                        {messageData.message}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
          <div className="biodata-master-biodata-page">
            <style>
              {`
    .biodata-master .biodata-master-photo-frame {
      border-color: ${getCurrentTheme().PHOTO_FRAME.BORDER_COLOR} !important;
    }
    .biodata-master-name-text h3 {
      font-size: ${styles.name.fontSize} !important;
    }
    .biodata-master-flex-section h3 {
      font-size: ${styles.headings.fontSize} !important;
    }
    .biodata-master h3 {
      color: ${getCurrentTheme().HEADINGS.COLOR} !important;
    }
    .biodata-master th {
      font-size: ${styles.table.headerFontSize} !important;
      color: ${getCurrentTheme().TABLE.HEADER.COLOR} !important;
      background-color: ${
        getCurrentTheme().TABLE.HEADER.BACKGROUND_COLOR
      } !important;
    }
    .biodata-master td {
      font-size: ${styles.table.dataFontSize} !important;
      color: ${getCurrentTheme().TABLE.DATA.COLOR} !important;
    }
    .biodata-master .biodata-master-section-icon {
      font-size: ${getCurrentTheme().ICONS.FONT_SIZE} !important;
      color: ${getCurrentTheme().ICONS.COLOR} !important;
    }
    .biodata-master .biodata-master-bio-table {
      --row-gap: ${styles.table.rowGap};
    }
    .biodata-master .biodata-master-bio-table tbody tr {
      background-color: ${
        getCurrentTheme().TABLE.DATA.BACKGROUND_COLOR
      } !important;
    }
    .biodata-master .biodata-master-bio-table tbody tr:nth-child(even) {
      background-color: ${
        getCurrentTheme().TABLE.DATA.ALTERNATE_BACKGROUND_COLOR
      } !important;
    }
    .biodata-master .biodata-master-bio-table thead tr,
    .biodata-master .biodata-master-bio-table tbody tr:first-child {
      background-color: ${
        getCurrentTheme().TABLE.HEADER.BACKGROUND_COLOR
      } !important;
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
                backgroundImage: `url(${getBiodataBackgroundImage(
                  selectedBackground
                )})`,
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
                          formData?.personalDetails?.find((field) =>
                            field.label.match(/^(Name|नाम)$/)
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
                            !field.label.match(/^(Name|नाम)$/) && (
                              <tr key={index}>
                                <td className="biodata-master-personal-icon-alignment">
                                  {ICON_MAPPING[field.label] ||
                                    ICON_MAPPING_HINDI[field.label]}
                                  {field.label}
                                </td>
                                <td>{field.value }</td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Professional/Examination Section */}
                {formData?.modelDetails?.type === "Student" ? (
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
                          {formData?.examinationDetails?.map((field, index) =>
                            (field.label === "Examination Qualified" ||
                              field.label === "परीक्षा उत्तीर्ण") &&
                            !field.value ? null : (
                              <th key={index}>{field.label}</th>
                            )
                          )}
                        </tr>
                        <tr>
                          {formData?.examinationDetails?.map((field, index) =>
                            (field.label === "Examination Qualified" ||
                              field.label === "परीक्षा उत्तीर्ण") &&
                            !field.value ? null : (
                              <td key={index}>{field.value}</td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="biodata-master-section professional-table">
                    <div className="biodata-master-section-title">
                      <span className="biodata-master-flex-section">
                        <Work className="biodata-master-section-icon" />
                        <h3>
                          {isLanguageEnglish
                            ? "Professional Details"
                            : "व्यावसायिक विवरण"}
                        </h3>
                      </span>
                    </div>
                    <table className="biodata-master-bio-table">
                      <tbody>
                        <tr>
                          {formData?.professionalDetails?.map(
                            (field, index) => (
                              <th key={index}>{field.label}</th>
                            )
                          )}
                        </tr>
                        <tr>
                          {formData?.professionalDetails?.map(
                            (field, index) => (
                              <td key={index}>
                                {field.value}
                              </td>
                            )
                          )}
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
                      <h3>
                        {isLanguageEnglish
                          ? "Educationl Details"
                          : "शैक्षिक विवरण"}
                      </h3>
                    </span>
                  </div>
                  <table className="biodata-master-bio-table">
                    <tbody>
                      <tr>
                        {formData?.educationDetails?.[0]?.map(
                          (field, index) => (
                            <th key={index}>{field.label}</th>
                          )
                        )}
                      </tr>
                      {formData?.educationDetails?.map((education, index) => (
                        <tr key={index}>
                          {education.map((field, fieldIndex) => (
                            <td key={fieldIndex}>
                              {field.value}
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
                      <h3>
                        {isLanguageEnglish ? "Family Details" : "परिवार विवरण"}
                      </h3>
                    </span>
                  </div>
                  <table className="biodata-master-bio-table">
                    <tbody>
                      <tr>
                        <th>{isLanguageEnglish ? "Relation" : "संबंध"}</th>
                        <th>{isLanguageEnglish ? "Name" : "नाम"}</th>
                        <th>
                          {isLanguageEnglish ? "Occupation" : "व्यावसायिक"}
                        </th>
                        <th>{isLanguageEnglish ? "Married" : "विवाहित"}</th>
                      </tr>
                      {/* Father's Details */}
                      <tr>
                        <td>{formData?.familyDetails?.father?.label}</td>
                        <td>
                          {formData?.familyDetails?.father?.value?.name}
                        </td>
                        <td>
                          {formData?.familyDetails?.father?.value?.occupation}
                        </td>
                        <td>-</td>
                      </tr>
                      {/* Mother's Details */}
                      <tr>
                        <td>{formData?.familyDetails?.mother?.label}</td>
                        <td>
                          {formData?.familyDetails?.mother?.value?.name}
                        </td>
                        <td>
                          {formData?.familyDetails?.mother?.value?.occupation}
                        </td>
                        <td>-</td>
                      </tr>
                      {/* Brothers Details in one row */}
                      {formData?.familyDetails?.brothers?.value?.length > 0 && (
                        <tr>
                          <td>{formData?.familyDetails?.brothers?.label}</td>
                          <td>
                            {formData.familyDetails.brothers.value.map(
                              (brother, index) => (
                                <div
                                  key={`brother-${index}`}
                                  className="sibling-info"
                                >
                                  {brother.name}
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
                                  {brother.occupation}
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
                          <td>{formData?.familyDetails?.sisters?.label}</td>
                          <td>
                            {formData.familyDetails.sisters.value.map(
                              (sister, index) => (
                                <div
                                  key={`sister-${index}`}
                                  className="sibling-info"
                                >
                                  {sister.name}
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
                                  {sister.occupation}
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
                      <h3>
                        {isLanguageEnglish ? "Contact Details" : "संपर्क विवरण"}
                      </h3>
                    </span>
                  </div>
                  <table className="biodata-master-bio-table">
                    <tbody>
                      <tr>
                        {formData?.contactDetails?.map((field, index) => (
                          <th key={index}>{field.label}</th>
                        ))}
                      </tr>
                      <tr>
                        {formData?.contactDetails?.map((field, index) => (
                          <td key={index}>{field.value}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="style-controls-sidebar">
            <div className="control-section">
              <h4 className="control-title">
                <span className="control-icon">
                  <Palette />
                </span>
                Background Theme
              </h4>
              <div className="control-group">
                <div className="control-item background-selector">
                  <select
                    value={selectedBackground}
                    onChange={(event) =>
                      setSelectedBackground(event.target.value)
                    }
                    className="background-select"
                  >
                    {Object.entries(BiodataBackgrounds).map(
                      ([modelNumber, bg]) => (
                        <option key={modelNumber} value={modelNumber}>
                          {bg.name}
                        </option>
                      )
                    )}
                  </select>
                  <div className="background-preview">
                    <img
                      src={getBiodataBackgroundImage(selectedBackground)}
                      alt="Selected background"
                    />
                  </div>
                </div>
              </div>
            </div>
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
                  {currentStatus === 4 && (
                    <button
                      className="print-btn original"
                      onClick={() => handlePrint(false)}
                    >
                      <span className="print-icon">📃</span>
                      <span className="print-text">
                        <span className="print-label">Original</span>
                      </span>
                    </button>
                  )}
                </div>
              </div>

              <div className="control-section">
                <h4>Name Font</h4>
                <div className="control-group">
                  <div className="control-item">
                    <label>
                      <div className="text-icon">
                        <FormatSize /> Name
                      </div>
                      <div className="size-control">
                        <button
                          className="size-btn"
                          onClick={() =>
                            setStyles((prev) => ({
                              ...prev,
                              name: {
                                ...prev.name,
                                fontSize: `${
                                  parseInt(prev.name.fontSize) - 1
                                }px`,
                              },
                            }))
                          }
                        >
                          -
                        </button>
                        <span className="size-value">
                          {styles.name.fontSize}
                        </span>
                        <button
                          className="size-btn"
                          onClick={() =>
                            setStyles((prev) => ({
                              ...prev,
                              name: {
                                ...prev.name,
                                fontSize: `${
                                  parseInt(prev.name.fontSize) + 1
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
                <h4>Table Font</h4>
                <div className="control-group">
                  <div className="control-item">
                    <label>
                      <div className="text-icon">
                        <FormatSize /> Table Heading
                      </div>
                      <div className="size-control">
                        <button
                          className="size-btn"
                          onClick={() =>
                            setStyles((prev) => ({
                              ...prev,
                              headings: {
                                ...prev.headings,
                                fontSize: `${
                                  parseInt(prev.headings.fontSize) - 1
                                }px`,
                              },
                            }))
                          }
                        >
                          -
                        </button>
                        <span className="size-value">
                          {styles.headings.fontSize}
                        </span>
                        <button
                          className="size-btn"
                          onClick={() =>
                            setStyles((prev) => ({
                              ...prev,
                              headings: {
                                ...prev.headings,
                                fontSize: `${
                                  parseInt(prev.headings.fontSize) + 1
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
                      <div className="text-icon">
                        <FormatSize /> Table Headers
                      </div>
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
                      <div className="text-icon">
                        <FormatSize /> Table Data
                      </div>
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
                      <div className="text-icon">
                        <FormatSize /> Gap
                      </div>
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

            <div className="control-section print-controls">
              <button
                className="print-btn save-style-settings"
                onClick={saveStyleSettings}
              >
                <span className="print-icon">
                  <FormatSize />
                </span>
                <span className="print-text">
                  <span className="print-label">Save Style Settings</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {notification.show && (
        <div className="notification-overlay">
          <div className={`notification-popup ${notification.type}`}>
            <button
              className="notification-close"
              onClick={() =>
                setNotification({ show: false, message: "", type: "success" })
              }
            >
              ×
            </button>
            <div className="notification-content">
              <div className={`notification-icon-wrapper ${notification.type}`}>
                {notification.type === "success" ? (
                  <div className="notification-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" className="icon-circle" />
                      <path
                        d="M8 12l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon-path"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="notification-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" className="icon-circle" />
                      <path
                        d="M15 9l-6 6M9 9l6 6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon-path"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="notification-text">
                <h3 className="notification-title">
                  {notification.type === "success" ? "Success!" : "Error!"}
                </h3>
                <p className="notification-message">{notification.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default BiodataMaster;
