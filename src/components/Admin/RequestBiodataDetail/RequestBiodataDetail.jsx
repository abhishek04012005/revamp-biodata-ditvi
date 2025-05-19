import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RequestBiodataDetail.css";
import {
  PersonalData,
  ProfessionalData,
  EducationData,
  createEmptyPerson,
  FamilyData,
  ExaminationData,
} from "../../../json/createBiodata";
import { BiodataRequestStorage } from "../../../supabase/BiodataRequest";
import { UploadFile } from "../../../supabase/UploadFile";
import StorageBucket from "../../../constants/StorageBucket";
import ModelTypes from "../../../json/ModelTypes";
import Loader from "../../../structure/Loader/Loader";
import { Edit, Save, Cancel } from "@mui/icons-material";

const RequestBiodataDetail = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    fetchRequestData();
  }, [requestId]);
  const fetchRequestData = async () => {
    try {
      setIsLoading(true);
      const response =
        await BiodataRequestStorage.getBiodataRequestByRequestId(
          requestId
        );

      if (response) {
        console.log('response:', response);
        const initialFormData = {
          profileImage: response.profile_url,
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

  const handleSave = async () => {
    try {
      setIsLoading(true);
      let profileUrl = formData.profileImage;

      if (selectedImage) {
        profileUrl = await UploadFile(
          selectedImage,
          `${requestId}_profile`,
          StorageBucket.CREATE_BIODATA
        );
      }

      await BiodataRequestStorage.updateBiodataRequestById(requestId, {
        profileUrl,
        personal_details: formData.personalDetails,
        professional_details: formData.professionalDetails,
        examination_details: formData.examinationDetails,
        education_details: formData.educationDetails,
        family_details: formData.familyDetails,
        contact_details: formData.contactDetails,
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

  // Render functions similar to CreateBiodata component
  const renderPersonalInfo = () => {
    return (
      <section className="detail-section">
        <div className="section-header">
          <h2>Personal Information</h2>
        </div>
        <div className="section-content">
          {formData.personalDetails.map((field, index) => (
            <div key={index} className="detail-field">
              <label>{field.label}:</label>
              {isEditing ? (
                <input
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
                />
              ) : (
                <span>{field.value || "Not Provided"}</span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderProfessionalInfo = () => {
    return (
      <section className="detail-section">
        <div className="section-header">
          <h2>Professional Information</h2>
        </div>
        <div className="section-content">
          {formData.professionalDetails.map((field, index) => (
            <div key={index} className="detail-field">
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
                />
              ) : (
                <span>{field.value || "Not Provided"}</span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderExaminationInfo = () => {
    return (
      <section className="detail-section">
        <div className="section-header">
          <h2>Examination Information</h2>
        </div>
        <div className="section-content">
          {formData.examinationDetails.map((field, index) => (
            <div key={index} className="detail-field">
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
                />
              ) : (
                <span>{field.value || "Not Provided"}</span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducationInfo = () => {
    return (
      <section className="detail-section">
        <div className="section-header">
          <h2>Education Information</h2>
        </div>
        {formData.educationDetails.map((eduGroup, groupIndex) => (
          <div key={groupIndex} className="education-group">
            <h3>Education {formData.educationDetails.length - groupIndex}</h3>
            <div className="section-content">
              {eduGroup.map((field, index) => (
                <div key={index} className="detail-field">
                  <label>{field.label}:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => {
                        const newEducation = [...formData.educationDetails];
                        newEducation[groupIndex][index].value = e.target.value;
                        setFormData({
                          ...formData,
                          educationDetails: newEducation,
                        });
                      }}
                    />
                  ) : (
                    <span>{field.value || "Not Provided"}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  };

  const renderFamilyInfo = () => {
    return (
      <section className="detail-section">
        <div className="section-header">
          <h2>Family Information</h2>
        </div>

        {/* Parents Section */}
        <div className="family-group">
          <h3>Parents</h3>
          <div className="section-content">
            {["father", "mother"].map((relation) => (
              <div key={relation} className="family-member">
                <h4>{formData.familyDetails[relation].label}</h4>
                <div className="detail-field">
                  <label>Name:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.familyDetails[relation].value.name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          familyDetails: {
                            ...formData.familyDetails,
                            [relation]: {
                              ...formData.familyDetails[relation],
                              value: {
                                ...formData.familyDetails[relation].value,
                                name: e.target.value,
                              },
                            },
                          },
                        });
                      }}
                    />
                  ) : (
                    <span>
                      {formData.familyDetails[relation].value.name ||
                        "Not Provided"}
                    </span>
                  )}
                </div>
                <div className="detail-field">
                  <label>Occupation:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.familyDetails[relation].value.occupation}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          familyDetails: {
                            ...formData.familyDetails,
                            [relation]: {
                              ...formData.familyDetails[relation],
                              value: {
                                ...formData.familyDetails[relation].value,
                                occupation: e.target.value,
                              },
                            },
                          },
                        });
                      }}
                    />
                  ) : (
                    <span>
                      {formData.familyDetails[relation].value.occupation ||
                        "Not Provided"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Siblings Section */}
        {["brothers", "sisters"].map((relation) => (
          <div key={relation} className="family-group">
            <h3>{formData.familyDetails[relation].label}</h3>
            <div className="siblings-list">
              {formData.familyDetails[relation].value.map((sibling, idx) => (
                <div key={idx} className="sibling-item">
                  <div className="detail-field">
                    <label>Name:</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={sibling.name}
                        onChange={(e) => {
                          const newSiblings = [
                            ...formData.familyDetails[relation].value,
                          ];
                          newSiblings[idx].name = e.target.value;
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
                    ) : (
                      <span>{sibling.name || "Not Provided"}</span>
                    )}
                  </div>
                  <div className="detail-field">
                    <label>Occupation:</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={sibling.occupation}
                        onChange={(e) => {
                          const newSiblings = [
                            ...formData.familyDetails[relation].value,
                          ];
                          newSiblings[idx].occupation = e.target.value;
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
                    ) : (
                      <span>{sibling.occupation || "Not Provided"}</span>
                    )}
                  </div>
                  <div className="detail-field">
                    <label>Married:</label>
                    {isEditing ? (
                      <select
                        value={sibling.married}
                        onChange={(e) => {
                          const newSiblings = [
                            ...formData.familyDetails[relation].value,
                          ];
                          newSiblings[idx].married = e.target.value;
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
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    ) : (
                      <span>{sibling.married || "Not Provided"}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  };

  const renderContactInfo = () => {
    return (
      <section className="detail-section">
        <div className="section-header">
          <h2>Contact Information</h2>
        </div>
        <div className="section-content">
          <div className="detail-field">
            <label>Address:</label>
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
              />
            ) : (
              <span>{formData.contactDetails.address || "Not Provided"}</span>
            )}
          </div>
          <div className="detail-field">
            <label>Mobile:</label>
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
              />
            ) : (
              <span>{formData.contactDetails.mobile || "Not Provided"}</span>
            )}
          </div>
        </div>
      </section>
    );
  };

  // Add similar render functions for other sections...

  return (
    <div className="request-detail">
      <div className="detail-header">
        <h1>Biodata Request Details</h1>
        <div className="detail-actions">
          {isEditing ? (
            <>
              <button className="action-btn save" onClick={handleSave}>
                <Save /> Save Changes
              </button>
              <button className="action-btn cancel" onClick={handleCancel}>
                <Cancel /> Cancel
              </button>
            </>
          ) : (
            <button
              className="action-btn edit"
              onClick={() => setIsEditing(true)}
            >
              <Edit /> Edit Details
            </button>
          )}
        </div>
      </div>

      <div className="detail-content">
        {/* Profile Image Section */}
        <section className="detail-section">
          <div className="section-header">
            <h2>Profile Image</h2>
          </div>
          <div className="section-content">
            <div className="profile-image-container">
              <img src={formData.profileImage} alt="Profile" />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                />
              )}
            </div>
          </div>
        </section>

        {renderPersonalInfo()}
        {renderProfessionalInfo()}
        {renderExaminationInfo()}
        {renderEducationInfo()}
        {renderFamilyInfo()}
        {renderContactInfo()}
      </div>
    </div>
  );
};

export default RequestBiodataDetail;
