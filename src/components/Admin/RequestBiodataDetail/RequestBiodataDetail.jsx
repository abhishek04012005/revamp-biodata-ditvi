import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RequestBiodataDetail.css";
import { getLanguageData } from "../../../json/languageCofig";
import {
  Edit,
  Save,
  Cancel,
  Add,
  Delete,
  Person,
  Work,
  School,
  People,
  ContactPhone,
  CloudUpload,
  ArrowBack,
  Download,
  InfoOutlined,
} from "@mui/icons-material";
import {
  PersonalData,
  ProfessionalData,
  EducationData,
  createEmptyPerson,
  FamilyData,
  ExaminationData,
  ContactData,
} from "../../../json/createBiodata";
import { BiodataRequestStorage } from "../../../supabase/BiodataRequest";
import { UploadFile } from "../../../supabase/UploadFile";
import StorageBucket from "../../../constants/StorageBucket";
import Loader from "../../../structure/Loader/Loader";
import ModelTypes from "../../../json/ModelTypes";

const RequestBiodataDetail = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [requestNumber, setRequestNumber] = useState(null);
  const [flowType, setFlowType] = useState(null);
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
        // Initialize language data based on model details
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
        setOriginalData(initialFormData);
        setFlowType(response.flow_type);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsLoading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            profileImage: reader.result,
          }));
        };
        reader.readAsDataURL(file);
        setSelectedImage(file);
      } catch (error) {
        console.error("Error handling image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educationDetails: [
        EducationData.map((field) => ({ ...field, value: "" })),
        ...prev.educationDetails,
      ],
    }));
  };

  const handleRemoveEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      educationDetails: prev.educationDetails.filter((_, i) => i !== index),
    }));
  };

  const handleAddSibling = (relation) => {
    setFormData((prev) => ({
      ...prev,
      familyDetails: {
        ...prev.familyDetails,
        [relation]: {
          ...prev.familyDetails[relation],
          value: [createEmptyPerson(), ...prev.familyDetails[relation].value],
        },
      },
    }));
  };

  const handleRemoveSibling = (relation, index) => {
    setFormData((prev) => ({
      ...prev,
      familyDetails: {
        ...prev.familyDetails,
        [relation]: {
          ...prev.familyDetails[relation],
          value: prev.familyDetails[relation].value.filter(
            (_, i) => i !== index
          ),
        },
      },
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      let profileUrl = formData.profileImage;

      if (selectedImage) {
        profileUrl = await UploadFile(
          selectedImage,
          `${requestNumber}_profile_${new Date().getTime()}`,
          StorageBucket.CREATE_BIODATA
        );
      }

      await BiodataRequestStorage.updateBiodataRequestById(requestId, {
        profileUrl,
        personalDetails: formData.personalDetails,
        professionalDetails: formData.professionalDetails,
        examinationDetails: formData.examinationDetails,
        educationDetails: formData.educationDetails,
        familyDetails: formData.familyDetails,
        contactDetails: formData.contactDetails,
      });

      setIsEditing(false);
      fetchRequestData();
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  if (isLoading) return <Loader />;
  if (!formData) return <div>Request not found</div>;

  const renderSection = (icon, title, children) => (
    <section className="detail-section info-section">
      <div className="section-header">
        <div className="header-icon">{icon}</div>
        <h2>{title}</h2>
      </div>
      <div className="section-content">{children}</div>
    </section>
  );

  // Update all render functions to use langData
  const renderPersonalInfo = () =>
    renderSection(
      <Person />,
      langData?.biodataMaster.personalDetails || "Personal Information",
      <div className="info-grid">
        {formData.personalDetails.map((field, index) => (
          <div key={index} className="detail-field animated-field">
            <label>{field.label}:</label>
            {isEditing ? (
              <input
                className="input-field-edit"
                type="text"
                value={field.value}
                onChange={(e) => {
                  const newPersonalData = [...formData.personalDetails];
                  newPersonalData[index].value = e.target.value;
                  setFormData({
                    ...formData,
                    personalDetails: newPersonalData,
                  });
                }}
                placeholder={`${field.label}`}
              />
            ) : (
              <span className="field-value">
                {field.value || langData?.placeholders.notProvided}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  const renderBiodataDownload = () =>
    renderSection(
      <CloudUpload />,
      "Biodata Document",
      <div className="biodata-download-section">
        {formData.biodataUrl ? (
          <div className="biodata-download-container">
            <a
              href={formData.biodataUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="download-button"
            >
              <Download /> Download Biodata
            </a>
            <span className="download-info">
              {" "}
              Click to view or download the biodata document
            </span>
          </div>
        ) : (
          <div className="no-biodata-message">
            <InfoOutlined />
            <span>Biodata document not yet generated</span>
          </div>
        )}
      </div>
    );

  const renderProfessionalInfo = () =>
    renderSection(
      <Work />,
      langData?.biodataMaster.professionalDetails || "Professional Information",
      <div className="info-grid">
        {formData.professionalDetails.map((field, index) => (
          <div key={index} className="detail-field animated-field">
            <label>{field.label}:</label>
            {isEditing ? (
              <input
                className="input-field-edit"
                type="text"
                value={field.value}
                onChange={(e) => {
                  const newProfessionalData = [...formData.professionalDetails];
                  newProfessionalData[index].value = e.target.value;
                  setFormData({
                    ...formData,
                    professionalDetails: newProfessionalData,
                  });
                }}
                placeholder={`${field.label}`}
              />
            ) : (
              <span className="field-value">
                {field.value || langData?.placeholders.notProvided}
              </span>
            )}
          </div>
        ))}
      </div>
    );

  const renderExaminationInfo = () =>
    renderSection(
      <School />,
      langData?.biodataMaster.examinationDetails || "Examination Information",
      <div className="info-grid">
        {formData.examinationDetails.map((field, index) => (
          <div key={index} className="detail-field animated-field">
            <label>{field.label}:</label>
            {isEditing ? (
              <input
                className="input-field-edit"
                type="text"
                value={field.value}
                onChange={(e) => {
                  const newExaminationData = [...formData.examinationDetails];
                  newExaminationData[index].value = e.target.value;
                  setFormData({
                    ...formData,
                    examinationDetails: newExaminationData,
                  });
                }}
                placeholder={`${field.label.toLowerCase()}`}
              />
            ) : (
              <span className="field-value">
                {field.value || langData?.placeholders.notProvided}
              </span>
            )}
          </div>
        ))}
      </div>
    );

  const renderEducationInfo = () =>
    renderSection(
      <School />,
      langData?.biodataMaster.educationDetails || "Education Information",
      <div className="education-section">
        {isEditing && (
          <button className="add-education-btn" onClick={handleAddEducation}>
            <Add /> {langData?.placeholders.addEducation}
          </button>
        )}
        {formData.educationDetails.map((education, eduIndex) => (
          <div key={eduIndex} className="education-entry animated-card">
            <h3>{`${langData?.placeholders.education} ${
              formData.educationDetails.length - eduIndex
            }`}</h3>
            <div className="info-grid">
              {education.map((field, fieldIndex) => (
                <div key={fieldIndex} className="detail-field">
                  <label>{field.label}:</label>
                  {isEditing ? (
                    <input
                      className="input-field-edit"
                      type="text"
                      value={field.value}
                      onChange={(e) => {
                        const newEducationData = [...formData.educationDetails];
                        newEducationData[eduIndex][fieldIndex].value =
                          e.target.value;
                        setFormData({
                          ...formData,
                          educationDetails: newEducationData,
                        });
                      }}
                      placeholder={`${field.label}`}
                    />
                  ) : (
                    <span className="field-value">
                      {field.value || langData?.placeholders.notProvided}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {isEditing && eduIndex > 0 && (
              <button
                className="remove-education-btn"
                onClick={() => handleRemoveEducation(eduIndex)}
              >
                <Delete /> {langData?.placeholders.removeEducation}
              </button>
            )}
          </div>
        ))}
      </div>
    );

  const renderFamilyInfo = () =>
    renderSection(
      <People />,
      langData?.biodataMaster.familyDetails || "Family Information",
      <>
        {/* Parents Section */}
        <div className="family-parents animated-card">
          <h3>{langData?.placeholders.parents}</h3>
          {["father", "mother"].map((relation) => (
            <div key={relation} className="parent-info">
              <h4>{formData.familyDetails[relation].label}</h4>
              <div className="info-grid">
                <div className="detail-field">
                  <label>{langData?.placeholders.name}:</label>
                  {isEditing ? (
                    <input
                      className="input-field-edit"
                      type="text"
                      value={formData.familyDetails[relation].value.name}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          familyDetails: {
                            ...prev.familyDetails,
                            [relation]: {
                              ...prev.familyDetails[relation],
                              value: {
                                ...prev.familyDetails[relation].value,
                                name: e.target.value,
                              },
                            },
                          },
                        }));
                      }}
                      placeholder={langData?.placeholders.name}
                    />
                  ) : (
                    <span className="field-value">
                      {formData.familyDetails[relation].value.name ||
                        langData?.placeholders.notProvided}
                    </span>
                  )}
                </div>
                <div className="detail-field">
                  <label>{langData?.placeholders.occupation}:</label>
                  {isEditing ? (
                    <input
                      className="input-field-edit"
                      type="text"
                      value={formData.familyDetails[relation].value.occupation}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          familyDetails: {
                            ...prev.familyDetails,
                            [relation]: {
                              ...prev.familyDetails[relation],
                              value: {
                                ...prev.familyDetails[relation].value,
                                occupation: e.target.value,
                              },
                            },
                          },
                        }));
                      }}
                      placeholder={langData?.placeholders.enterOccupation}
                    />
                  ) : (
                    <span className="field-value">
                      {formData.familyDetails[relation].value.occupation ||
                        langData?.placeholders.notProvided}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Siblings Section */}
        {["brothers", "sisters"].map((relation) => (
          <div key={relation} className="family-siblings animated-card">
            <div className="siblings-header">
              <h3>{formData.familyDetails[relation].label}</h3>
              {isEditing && (
                <button
                  className="add-btn floating"
                  onClick={() => handleAddSibling(relation)}
                >
                  <Add />
                  {relation === "brothers"
                    ? langData?.placeholders.addBrother
                    : langData?.placeholders.addSister}
                </button>
              )}
            </div>
            {formData.familyDetails[relation].value.map((sibling, index) => (
              <div key={index} className="sibling-info">
                <div className="info-grid">
                  <div className="detail-field">
                    <label>{langData?.placeholders.name}:</label>
                    {isEditing ? (
                      <input
                        className="input-field-edit"
                        type="text"
                        value={sibling.name}
                        onChange={(e) => {
                          const updatedSiblings = [
                            ...formData.familyDetails[relation].value,
                          ];
                          updatedSiblings[index] = {
                            ...updatedSiblings[index],
                            name: e.target.value,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            familyDetails: {
                              ...prev.familyDetails,
                              [relation]: {
                                ...prev.familyDetails[relation],
                                value: updatedSiblings,
                              },
                            },
                          }));
                        }}
                        placeholder={langData?.placeholders.name}
                      />
                    ) : (
                      <span className="field-value">
                        {sibling.name || langData?.placeholders.notProvided}
                      </span>
                    )}
                  </div>
                  <div className="detail-field">
                    <label>{langData?.placeholders.occupation}:</label>
                    {isEditing ? (
                      <input
                        className="input-field-edit"
                        type="text"
                        value={sibling.occupation}
                        onChange={(e) => {
                          const updatedSiblings = [
                            ...formData.familyDetails[relation].value,
                          ];
                          updatedSiblings[index] = {
                            ...updatedSiblings[index],
                            occupation: e.target.value,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            familyDetails: {
                              ...prev.familyDetails,
                              [relation]: {
                                ...prev.familyDetails[relation],
                                value: updatedSiblings,
                              },
                            },
                          }));
                        }}
                        placeholder={langData?.placeholders.occupation}
                      />
                    ) : (
                      <span className="field-value">
                        {sibling.occupation ||
                          langData?.placeholders.notProvided}
                      </span>
                    )}
                  </div>
                  <div className="detail-field">
                    <label>{langData?.placeholders.married}:</label>
                    {isEditing ? (
                      <div className="radio-group">
                        <label>
                          <input
                            type="radio"
                            name={`married-${relation}-${index}`}
                            checked={
                              sibling.married === langData?.placeholders.yes
                            }
                            onChange={() => {
                              const updatedSiblings = [
                                ...formData.familyDetails[relation].value,
                              ];
                              updatedSiblings[index] = {
                                ...updatedSiblings[index],
                                married: langData?.placeholders.yes,
                              };
                              setFormData((prev) => ({
                                ...prev,
                                familyDetails: {
                                  ...prev.familyDetails,
                                  [relation]: {
                                    ...prev.familyDetails[relation],
                                    value: updatedSiblings,
                                  },
                                },
                              }));
                            }}
                          />
                          {langData?.placeholders.yes}
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`married-${relation}-${index}`}
                            checked={
                              sibling.married === langData?.placeholders.no
                            }
                            onChange={() => {
                              const updatedSiblings = [
                                ...formData.familyDetails[relation].value,
                              ];
                              updatedSiblings[index] = {
                                ...updatedSiblings[index],
                                married: langData?.placeholders.no,
                              };
                              setFormData((prev) => ({
                                ...prev,
                                familyDetails: {
                                  ...prev.familyDetails,
                                  [relation]: {
                                    ...prev.familyDetails[relation],
                                    value: updatedSiblings,
                                  },
                                },
                              }));
                            }}
                          />
                          {langData?.placeholders.no}
                        </label>
                      </div>
                    ) : (
                      <span className="field-value">
                        {sibling.married || langData?.placeholders.no}
                      </span>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveSibling(relation, index)}
                  >
                    <Delete />
                    {relation === "brothers"
                      ? langData?.placeholders.removeBrother
                      : langData?.placeholders.removeSister}
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </>
    );

  const renderContactInfo = () =>
    renderSection(
      <ContactPhone />,
      langData?.biodataMaster.contactDetails || "Contact Information",
      <div className="info-grid">
        {formData.contactDetails.map((field, index) => (
          <div key={index} className="detail-field animated-field">
            <label>{field.label}:</label>
            {isEditing ? (
              <input
                className="input-field-edit"
                type={
                  field.label.toLowerCase().includes("email") ? "email" : "text"
                }
                value={field.value}
                onChange={(e) => {
                  const newContactData = [...formData.contactDetails];
                  newContactData[index].value = e.target.value;
                  setFormData({
                    ...formData,
                    contactDetails: newContactData,
                  });
                }}
                placeholder={`${field.label}`}
              />
            ) : (
              <span className="field-value">
                {field.value || langData?.placeholders.notProvided}
              </span>
            )}
          </div>
        ))}
      </div>
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
            <h1>{langData?.placeholders.biodataRequestDetails}</h1>
            <p className="request-id">
              {langData?.placeholders.requestNumber}: {requestNumber}
            </p>
          </div>
        </div>
        <div className="detail-actions">
          {flowType !== 3 &&
            (isEditing ? (
              <div className="edit-actions">
                <button className="action-btn save" onClick={handleSave}>
                  <Save /> Save
                  <span className="btn-highlight"></span>
                </button>
                <button className="action-btn cancel" onClick={handleCancel}>
                  <Cancel /> Cancel
                  <span className="btn-highlight"></span>
                </button>
              </div>
            ) : (
              <button
                className="action-btn edit"
                onClick={() => setIsEditing(true)}
              >
                <Edit /> Edit Details
                <span className="btn-highlight"></span>
              </button>
            ))}
        </div>
      </div>

      <div className="detail-content">
        <div className="content-grid">
          <div className="content-grid">
            {renderSection(
              <Person />,
              "Profile Image",
              <div className="profile-section">
                <div className="profile-image-container">
                  <img src={formData.profileImage} alt="Profile" />
                  {isEditing && (
                    <div className="image-upload-overlay">
                      <CloudUpload />
                      <span>Upload New Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="image-input"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            {formData.biodataUrl && renderBiodataDownload()}
            {renderPersonalInfo()}
            {formData.modelDetails?.type === ModelTypes.Student.Name
              ? renderExaminationInfo()
              : renderProfessionalInfo()}
            {renderEducationInfo()}
            {renderFamilyInfo()}
            {renderContactInfo()}
          </div>
        </div>

        {isLoading && (
          <div className="loading-overlay">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestBiodataDetail;
