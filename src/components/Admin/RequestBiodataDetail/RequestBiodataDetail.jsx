import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RequestBiodataDetail.css";
import { getLanguageData } from "../../../json/languageCofig";
import {
  Person,
  Work,
  School,
  People,
  ContactPhone,
  ArrowBack,
  Download,
} from "@mui/icons-material";
import {
  PersonalData,
  ProfessionalData,
  EducationData,
  FamilyData,
  ExaminationData,
  ContactData,
} from "../../../json/createBiodata";
import { BiodataRequestStorage } from "../../../supabase/BiodataRequest";
import Loader from "../../../structure/Loader/Loader";
import ModelTypes from "../../../json/ModelTypes";

const RequestBiodataDetail = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [requestNumber, setRequestNumber] = useState(null);
  const [langData, setLangData] = useState(null);

  useEffect(() => {
    fetchRequestData(requestId);
  }, [requestId]);

  const fetchRequestData = async (requestId) => {
    try {
      setIsLoading(true);
      const response = await BiodataRequestStorage.getBiodataRequestByRequestId(
        requestId
      );

      if (response) {
        const languageData = getLanguageData(response.model_details);
        setLangData(languageData);

        const initialFormData = {
          profileImage: response.profile_url,
          biodataUrl: response.biodata_url,
          userDetails: response.user_details,
          modelDetails: response.model_details,
          personalDetails: response.personal_details || PersonalData,
          professionalDetails:
            response.professional_details || ProfessionalData,
          examinationDetails: response.examination_details || ExaminationData,
          educationDetails: response.education_details || [EducationData],
          familyDetails: response.family_details || FamilyData,
          contactDetails: response.contact_details || ContactData,
        };

        setRequestNumber(response.request_number);
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
    } finally {
      setIsLoading(false);
    }
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

  if (isLoading || !langData) return <Loader />;
  if (!formData)
    return (
      <div className="not-found">{langData?.placeholders.requestNotFound}</div>
    );

  return (
    <div className="request-detail">
      <div className="detail-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowBack /> Back
          </button>
          <div className="header-info">
            <h1>Biodata Request Details</h1>
            <h3 className="request-id">Request No. : {requestNumber}</h3>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="content-grid">
          {/* Profile Section */}
          {renderSection(
            <Person />,
            "Profile Image",
            <div className="profile-section">
              <div className="profile-image-container">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-placeholder">
                    <Person />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Biodata Download Section */}
          {formData.biodataUrl &&
            renderSection(
              <Download />,
              "Biodata Document",
              <div className="biodata-download-section">
                <div className="biodata-download-container">
                  <a
                    href={formData.biodataUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-button"
                  >
                    <Download /> View Biodata
                  </a>
                </div>
              </div>
            )}

          {/* Personal Info Section */}
          {renderSection(
            <Person />,
            langData?.biodataMaster.personalDetails,
            <div className="info-grid">
              {formData.personalDetails.map((field, index) => (
                <div key={index} className="detail-field">
                  <label>{field.label}:</label>
                  <span className="field-value">{field.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Professional/Examination Info Section */}
          {formData.modelDetails?.type === ModelTypes.Student.Name
            ? renderSection(
                <School />,
                langData?.biodataMaster.examinationDetails,
                <div className="info-grid">
                  {formData.examinationDetails.map((field, index) => (
                    <div key={index} className="detail-field">
                      <label>{field.label}:</label>
                      <span className="field-value">{field.value}</span>
                    </div>
                  ))}
                </div>
              )
            : renderSection(
                <Work />,
                langData?.biodataMaster.professionalDetails,
                <div className="info-grid">
                  {formData.professionalDetails.map((field, index) => (
                    <div key={index} className="detail-field">
                      <label>{field.label}:</label>
                      <span className="field-value">{field.value}</span>
                    </div>
                  ))}
                </div>
              )}

          {/* Education Info Section */}
          {renderSection(
            <School />,
            langData?.biodataMaster.educationDetails,
            <div className="education-section">
              {formData.educationDetails.map((education, eduIndex) => (
                <div key={eduIndex} className="education-entry">
                  <h3>{`${langData?.placeholders.education} ${
                    formData.educationDetails.length - eduIndex
                  }`}</h3>
                  <div className="info-grid">
                    {education.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="detail-field">
                        <label>{field.label}:</label>
                        <span className="field-value">{field.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Family Info Section */}
          {renderSection(
            <People />,
            langData?.biodataMaster.familyDetails,
            <>
              <div className="family-parents">
                <h3>{langData?.placeholders.parents}</h3>
                {["father", "mother"].map((relation) => (
                  <div key={relation} className="parent-info">
                    <h4>{formData.familyDetails[relation].label}</h4>
                    <div className="info-grid">
                      <div className="detail-field">
                        <label>{langData?.placeholders.name}:</label>
                        <span className="field-value">
                          {formData.familyDetails[relation].value.name}
                        </span>
                      </div>
                      <div className="detail-field">
                        <label>{langData?.placeholders.occupation}:</label>
                        <span className="field-value">
                          {formData.familyDetails[relation].value.occupation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {["brothers", "sisters"].map((relation) => (
                <div key={relation} className="family-siblings">
                  <h3>{formData.familyDetails[relation].label}</h3>
                  {formData.familyDetails[relation].value.map(
                    (sibling, index) => (
                      <div key={index} className="sibling-info">
                        <div className="info-grid">
                          <div className="detail-field">
                            <label>{langData?.placeholders.name}:</label>
                            <span className="field-value">{sibling.name}</span>
                          </div>
                          <div className="detail-field">
                            <label>{langData?.placeholders.occupation}:</label>
                            <span className="field-value">
                              {sibling.occupation}
                            </span>
                          </div>
                          <div className="detail-field">
                            <label>{langData?.placeholders.married}:</label>
                            <span className="field-value">
                              {sibling.married || langData?.placeholders.no}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </>
          )}

          {/* Contact Info Section */}
          {renderSection(
            <ContactPhone />,
            langData?.biodataMaster.contactDetails,
            <div className="info-grid">
              {formData.contactDetails.map((field, index) => (
                <div key={index} className="detail-field">
                  <label>{field.label}:</label>
                  <span className="field-value">{field.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default RequestBiodataDetail;
