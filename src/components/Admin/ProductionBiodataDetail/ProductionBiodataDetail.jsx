import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductionBiodataDetail.css";
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
  Phone,
  LocationOn,
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
} from "../../../json/createBiodata";
import { UploadFile } from "../../../supabase/UploadFile";
import StorageBucket from "../../../constants/StorageBucket";
import Loader from "../../../structure/Loader/Loader";
import { ProductionRequestStorage } from "../../../supabase/ProductionRequest";
import ModelTypes from "../../../json/ModelTypes";

const ProductionBiodataDetail = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [requestNumber, setRequestNumber] = useState(null);
  const [langData, setLangData] = useState(null);

  useEffect(() => {
    fetchRequestData(requestId);
  }, [requestId]);

  const fetchRequestData = async (requestId) => {
    try {
      setIsLoading(true);
      const response = await ProductionRequestStorage.getProductionRequestById(
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
          contactDetails: response.contact_details || {},
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
          StorageBucket.PRODUCTION_BIODATA
        );
      }

      await ProductionRequestStorage.updateProductionRequestById(requestId, {
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

  const renderPersonalInfo = () =>
    renderSection(
      <Person />,
      "Personal Information",
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
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            ) : (
              <span className="field-value">
                {field.value || "Not Provided"}
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
      "Professional Information",
      <div className="info-grid">
        {formData.professionalDetails.map((field, index) => (
          <div key={index} className="detail-field animated-field">
            <label>{field.label}:</label>
            {isEditing ? (
              <input
                type="text"
                value={field.value}
                onChange={(e) => {
                  const newData = [...formData.professionalDetails];
                  newData[index].value = e.target.value;
                  setFormData({
                    ...formData,
                    professionalDetails: newData,
                  });
                }}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            ) : (
              <span className="field-value">
                {field.value || "Not Provided"}
              </span>
            )}
          </div>
        ))}
      </div>
    );

  const renderExaminationInfo = () =>
    renderSection(
      <School />,
      "Examination Information",
      <div className="info-grid">
        {formData.examinationDetails.map((field, index) => (
          <div key={index} className="detail-field animated-field">
            <label>{field.label}:</label>
            {isEditing ? (
              <input
                type="text"
                value={field.value}
                onChange={(e) => {
                  const newData = [...formData.examinationDetails];
                  newData[index].value = e.target.value;
                  setFormData({
                    ...formData,
                    examinationDetails: newData,
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

  const renderEducationInfo = () =>
    renderSection(
      <School />,
      "Education Information",
      <>
        {isEditing && (
          <button className="add-btn floating" onClick={handleAddEducation}>
            <Add /> Add Education
          </button>
        )}
        <div className="education-list">
          {Array.isArray(formData.educationDetails) &&
            formData.educationDetails.map((eduGroup, groupIndex) => (
              <div key={groupIndex} className="education-group animated-card">
                <div className="group-header">
                  <h3>
                    Education {formData.educationDetails.length - groupIndex}
                  </h3>
                  {isEditing && (
                    <button
                      className="remove-btn floating"
                      onClick={() => handleRemoveEducation(groupIndex)}
                    >
                      <Delete />
                    </button>
                  )}
                </div>
                <div className="info-grid">
                  {Array.isArray(eduGroup) &&
                    eduGroup.map((field, index) => (
                      <div key={index} className="detail-field animated-field">
                        <label>{field.label}:</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={field.value || ""}
                            onChange={(e) => {
                              const newEducation = [
                                ...formData.educationDetails,
                              ];
                              newEducation[groupIndex][index].value =
                                e.target.value;
                              setFormData({
                                ...formData,
                                educationDetails: newEducation,
                              });
                            }}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        ) : (
                          <span className="field-value">
                            {field.value || "Not Provided"}
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </>
    );

  const renderFamilyInfo = () =>
    renderSection(
      <People />,
      "Family Information",
      <>
        <div className="family-parents animated-card">
          <h3>Parents</h3>
          <div className="parents-grid">
            {["father", "mother"].map((relation) => (
              <div key={relation} className="parent-card">
                <h4>{formData.familyDetails[relation].label}</h4>
                <div className="info-grid">
                  {["name", "occupation"].map((field) => (
                    <div key={field} className="detail-field animated-field">
                      <label>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.familyDetails[relation].value[field]}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              familyDetails: {
                                ...formData.familyDetails,
                                [relation]: {
                                  ...formData.familyDetails[relation],
                                  value: {
                                    ...formData.familyDetails[relation].value,
                                    [field]: e.target.value,
                                  },
                                },
                              },
                            });
                          }}
                          placeholder={`Enter ${field}`}
                        />
                      ) : (
                        <span className="field-value">
                          {formData.familyDetails[relation].value[field] ||
                            "Not Provided"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {["brothers", "sisters"].map((relation) => (
          <div key={relation} className="family-siblings animated-card">
            <div className="siblings-header">
              <h3>{formData.familyDetails[relation].label}</h3>
              {isEditing && (
                <button
                  className="add-btn floating"
                  onClick={() => handleAddSibling(relation)}
                >
                  <Add /> Add {relation === "brothers" ? "Brother" : "Sister"}
                </button>
              )}
            </div>
            <div className="siblings-grid">
              {formData.familyDetails[relation].value.map((sibling, idx) => (
                <div key={idx} className="sibling-card">
                  {isEditing && (
                    <button
                      className="remove-btn floating"
                      onClick={() => handleRemoveSibling(relation, idx)}
                    >
                      <Delete />
                    </button>
                  )}
                  <div className="info-grid">
                    {["name", "occupation", "married"].map((field) => (
                      <div key={field} className="detail-field animated-field">
                        <label>
                          {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </label>
                        {isEditing ? (
                          field === "married" ? (
                            <div className="radio-group">
                              {[
                                langData?.placeholders.yes,
                                langData?.placeholders.no,
                              ].map((option) => (
                                <label key={option} className="radio-option">
                                  <input
                                    type="radio"
                                    name={`married-${relation}-${idx}`}
                                    value={option}
                                    checked={
                                      sibling[field]
                                        ? sibling[field] === option
                                        : option === langData?.placeholders.no
                                    }
                                    onChange={(e) => {
                                      const newSiblings = [
                                        ...formData.familyDetails[relation]
                                          .value,
                                      ];
                                      newSiblings[idx][field] = e.target.value;
                                      setFormData({
                                        ...formData,
                                        familyDetails: {
                                          ...formData.familyDetails,
                                          [relation]: {
                                            ...formData.familyDetails[relation],
                                            value: newSiblings,
                                          },
                                        },
                                      });
                                    }}
                                  />
                                  <span className="radio-label">{option}</span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={sibling[field]}
                              onChange={(e) => {
                                const newSiblings = [
                                  ...formData.familyDetails[relation].value,
                                ];
                                newSiblings[idx][field] = e.target.value;
                                setFormData({
                                  ...formData,
                                  familyDetails: {
                                    ...formData.familyDetails,
                                    [relation]: {
                                      ...formData.familyDetails[relation],
                                      value: newSiblings,
                                    },
                                  },
                                });
                              }}
                              placeholder={`Enter ${field}`}
                            />
                          )
                        ) : (
                          <span className="field-value">
                            {sibling[field] || "Not Provided"}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );

  const renderContactInfo = () =>
    renderSection(
      <ContactPhone />,
      "Contact Information",
      <div className="contact-grid">
        <div className="detail-field animated-field">
          <label>
            <LocationOn /> Address:
          </label>
          {isEditing ? (
            <textarea
              value={formData.contactDetails.address || ""}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  contactDetails: {
                    ...formData.contactDetails,
                    address: e.target.value,
                  },
                });
              }}
              placeholder="Enter address"
            />
          ) : (
            <span className="field-value">
              {formData.contactDetails.address || "Not Provided"}
            </span>
          )}
        </div>
        <div className="detail-field animated-field">
          <label>
            <Phone /> Mobile:
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={formData.contactDetails.mobile || ""}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  contactDetails: {
                    ...formData.contactDetails,
                    mobile: e.target.value,
                  },
                });
              }}
              placeholder="Enter mobile number"
            />
          ) : (
            <span className="field-value">
              {formData.contactDetails.mobile || "Not Provided"}
            </span>
          )}
        </div>
      </div>
    );

  if (isLoading) return <Loader />;
  if (!formData) return <div className="not-found">Request not found</div>;

  return (
    <div className="request-detail">
      <div className="detail-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowBack /> Back
          </button>
          <div className="header-info">
            <h1>Biodata Request Details</h1>
            <p className="request-id">Request Number: {requestNumber}</p>
          </div>
        </div>
        <div className="detail-actions">
          {isEditing ? (
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
          )}
        </div>
      </div>

      <div className="detail-content">
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

      {isLoading && <Loader />}
    </div>
  );
};

export default ProductionBiodataDetail;
