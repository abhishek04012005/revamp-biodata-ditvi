/* eslint-disable default-case */
import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from "../../structure/Loader/Loader";
import "./CreateBiodata.css";
import {
  PersonalData,
  ProfessionalData,
  EducationData,
  createEmptyPerson,
  FamilyData,
} from "../../json/createBiodata";
import { Mode } from "@mui/icons-material";
import ModelTypes from "../../json/ModelTypes";
import { BiodataRequestsStorage } from "../../supabase/BiodataRequests";

const CreateBiodata = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { requestNumber, userDetails, modelDetails } = location.state || {};

  const [formData, setFormData] = useState({
    profileImage: null,
    name: '',
    userDetails: userDetails,
    modelDetails: modelDetails,
    personalDetails: PersonalData.map(({ label, value }) => ({ label, value })),
    professionalDetails: ProfessionalData.map(({ label, value }) => ({ label, value })),
    examinaitonDetails: {},
    educationDetails: [EducationData.map(({ label, value }) => ({ label, value }))],
    familyDetails: FamilyData,
    contactDetails: {},
  });
  
  const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size
      if (file.size > MAX_IMAGE_SIZE) {
        alert("Image size should be less than or equal to 1MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }

      try {
        setIsLoading(true);
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            profileImage: reader.result,
          }));
        };
        reader.onerror = () => {
          alert("Error reading file");
        };
        reader.readAsDataURL(file);

        setSelectedImage(file);
      } catch (error) {
        console.error("Error handling image:", error);
        alert("Failed to process image");
      } finally {
        setIsLoading(false);
      }
    }
  };

       const handleAddEducation = () => {
          if (formData.educationDetails.length < 5) {
        setFormData(prev => ({
            ...prev,
            educationDetails: [...prev.educationDetails, EducationData.map(({ label }) => ({ label, value: '' }))]
        }));
      }
        };

  const handleDeleteEducation = (indexToDelete) => {
    if (formData.educationDetails.length > 1) {
      setFormData((prev) => ({
        ...prev,
        educationDetails: prev.educationDetails.filter(
          (_, index) => index !== indexToDelete
        ),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep !== steps.length - 1) {
            handleNext();
            return;
        }

    try {
      setIsLoading(true);
      const response = await BiodataRequestsStorage.saveBiodataRequestFromCreateBiodata({
        requestNumber: requestNumber,
        userDetails: userDetails,
        modelDetails: modelDetails,
        profileImage: formData.profileImage,
        personalDetails: formData.personalDetails,
        professionalDetails: formData.professionalDetails,
        examinationDetails: formData.examPreparing,
        educationDetails: formData.educationDetails,
        familyDetails: formData.familyDetails,
        contactDetails: formData.contactDetails
      });
      console.log("Biodata saved successfully:", response);
    }
    catch (error) {
      console.error("Error saving biodata:", error);
      alert("Failed to save biodata");
    }

    if (currentStep !== steps.length - 1) {
      handleNext();
      return;
    }

    // Validate contact data
    if (!formData.contactDetails?.address || !formData.contactDetails?.mobile) {
      alert("Please fill in all contact information");
      return;
    }

    setIsLoading(true);
  };

  const steps = [
    "Profile Image",
    "Personal",
    "Professional",
    "Education",
    "Family",
    "Contact",
    "Preview",
  ];

  const setFamilyDetails = (relation, index, key, value) => {
        setFormData(prev => ({
            ...prev,
            familyDetails: {
                ...prev.familyDetails,
                [relation]: {
                    ...prev.familyDetails[relation],
                    value: Array.isArray(prev.familyDetails[relation].value)
                        ? prev.familyDetails[relation].value.map((person, i) => 
                            i === index ? { ...person, [key]: value } : person
                        )
                        : { ...prev.familyDetails[relation].value, [key]: value }
                }
            }
        }));
    };

    // Function to add a sibling (brother/sister)
    const handleAddSibling = (relation) => {
        if (formData.familyDetails[relation].value.length < 6) {
            setFormData(prev => ({
                ...prev,
                familyDetails: {
                    ...prev.familyDetails,
                    [relation]: {
                        ...prev.familyDetails[relation],
                        value: [...prev.familyDetails[relation].value, createEmptyPerson()]
                    }
                }
            }));
        }
    };

    // Function to remove a sibling (brother/sister)
    const handleRemoveSibling = (relation, index) => {
        setFormData(prev => ({
            ...prev,
            familyDetails: {
                ...prev.familyDetails,
                [relation]: {
                    ...prev.familyDetails[relation],
                    value: prev.familyDetails[relation].value.filter((_, i) => i !== index)
                }
            }
        }));
    };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="create-biodata-section">
            <h2>Profile Image</h2>
            <div className="create-biodata-image-upload-container">
              <label className="create-biodata-image-upload-label">
                <input
                  type="file"
                  accept="image/*"
                  className="create-biodata-image-input"
                  style={{ display: "none" }}
                  // onChange={handleImageChange}
                />
                <span className="create-biodata-upload-button">
                  {formData.profileImage ? "Change Image" : "Upload Image"}
                </span>
              </label>
              {formData.profileImage && (
                <div className="create-biodata-image-preview-container">
                  <div className="create-biodata-image-preview">
                    <img
                      src={formData.profileImage}
                      alt="Profile Previw"
                      className="create-biodata-preview-image"
                    />
                  </div>
                  <button
                    type="button"
                    className="create-biodata-remove-image-btn"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, profileImage: null }));
                      setSelectedImage(null);
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )}
              <div className="create-biodata-image-requirements">
                <small>
                  * Accepted formats: JPG, PNG, JPEG
                  <br />
                  * Maximum size: 1MB
                  <br />* Recommended dimensions: 400x400px
                </small>
              </div>
            </div>
          </div>
        );
      case 1: //Personal Information
        return (
          <>
            <div className="create-biodata-section">
              <h2>Personal Information</h2>
              <input
                type="text"
                placeholder="Name"
                value={formData.name.value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { value: e.target.value },
                  })
                }
                required
              />
              {formData.personalDetails.map((field, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={field.label}
                  value={field.value}
                  onChange={(e) => {
                    const newPersonalData = [...formData.personalDetails];
                    newPersonalData[index].value = e.target.value;
                    setFormData({ ...formData, personalDetails: newPersonalData });
                  }}
                  required
                />
              ))}
            </div>
          </>
        );
      case 2: // Professional Information
        return (
          <div className="create-biodata-section">
            <h2>
              {modelDetails?.type === ModelTypes.Student.Name
                ? "Job Preparing Details"
                : "Professional Information"}
            </h2>
            {modelDetails?.type === ModelTypes.Student.Name ? (
              <div className="examination-details">
                <div className="examination-group">
                  <input
                    type="text"
                    className="exam-input"
                    placeholder="Examination Preparing"
                    value={
                      formData.professionalDetails[0].examPreparing?.name || ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        professionalDetails: [
                          {
                            ...formData.professionalDetails[0],
                            examPreparing: {
                              ...formData.professionalDetails[0].examPreparing,
                              name: e.target.value,
                            },
                          },
                        ],
                      })
                    }
                    required
                  />
                </div>

                <div className="examination-group">
                  <input
                    type="text"
                    className="exam-input"
                    placeholder="Examination Qualified"
                    value={
                      formData.professionalDetails[0].examQualified?.name || ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        professionalDetails: [
                          {
                            ...formData.professionalDetails[0],
                            examQualified: {
                              ...formData.professionalDetails[0].examQualified,
                              name: e.target.value,
                            },
                          },
                        ],
                      })
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="professional-inputs">
                {formData.professionalDetails.map((field, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={field.label}
                  value={field.value}
                  onChange={(e) => {
                    const newProfessionalDetails = [...formData.professionalDetails];
                    newProfessionalDetails[index].value = e.target.value;
                    setFormData({ ...formData, professionalDetails: newProfessionalDetails });
                  }}
                  required
                />
              ))}
              </div>
            )}
          </div>
        );
      case 3: //Education Information
        return (
          <>
            <div className="create-biodata-section">
              <h2>Education Information</h2>
              {formData.educationDetails.length < 5 && (
                <button
                  type="button"
                  className="create-biodata-add-btn"
                  onClick={handleAddEducation}
                >
                  + Add Education ({5 - formData.educationDetails.length}{" "}
                  remaining)
                </button>
              )}

              {formData.educationDetails.map((educationGroup, index) => (
                <div key={index} className="education-group">
                    <div className="education-header">
                        <h3>Education {formData.educationDetails.length - index}</h3>
                    </div>
                    <div className="education-inputs">
                        {educationGroup.map((field, fieldIndex) => (
                            <input
                                key={fieldIndex}
                                type="text"
                                placeholder={field.label}
                                value={field.value}
                                onChange={(e) => {
                                    const newEducationData = formData.educationDetails.map((group, i) =>
                                        i === index ? group.map((f, fi) => (fi === fieldIndex ? { ...f, value: e.target.value } : f)) : group
                                    );
                                    setFormData({ ...formData, educationDetails: newEducationData });
                                }}
                                required
                            />
                        ))}
                        {formData.educationDetails.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleDeleteEducation(index)}
                                className="create-biodata-delete-btn"
                            >
                                Remove Education {formData.educationDetails.length - index}
                            </button>
                        )}
                    </div>
                </div>
            ))}
            </div>
          </>
        );
      case 4: //Family Information
        return (
          <>
            <div className="create-biodata-section">
              <h2>Family Information</h2>

            {/* Parents Section */}
            {['father', 'mother'].map((relation) => (
                <div key={relation} className="create-biodata-family-group">
                    <h3>{formData.familyDetails[relation].label}</h3>
                    <div className="create-biodata-family-inputs">
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.familyDetails[relation].value.name}
                            onChange={(e) => setFamilyDetails(relation, null, 'name', e.target.value)}
                            required
                        />
                        <input
                            style={{ display: 'none' }}
                            type="text"
                            value="-"
                            disabled
                            className="married-status-disabled"
                        />
                        <input
                            type="text"
                            placeholder="Occupation"
                            value={formData.familyDetails[relation].value.occupation}
                            onChange={(e) => setFamilyDetails(relation, null, 'occupation', e.target.value)}
                            required
                        />
                    </div>
                </div>
            ))}

            {/* Sibling Section */}
            {['brothers', 'sisters'].map((relation) => (
                <div key={relation} className="create-biodata-family-group">
                    <div className="sibling-header">
                        <h3>{formData.familyDetails[relation].label}</h3>
                        {formData.familyDetails[relation].value.length < 6 && (
                            <button type="button" onClick={() => handleAddSibling(relation)} className="create-biodata-add-btn">
                                + Add {relation === 'brothers' ? 'Brother' : 'Sister'}
                            </button>
                        )}
                    </div>
                    <div className="create-biodata-siblings-grid">
                        {formData.familyDetails[relation].value.map((sibling, idx) => (
                            <div key={idx} className="create-biodata-sibling-row">
                                <div className="create-biodata-sibling-inputs">
                                    <input
                                        type="text"
                                        placeholder={`${relation === 'brothers' ? 'Brother' : 'Sister'} ${idx + 1} Name`}
                                        value={sibling.name}
                                        onChange={(e) => setFamilyDetails(relation, idx, 'name', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Occupation"
                                        value={sibling.occupation}
                                        onChange={(e) => setFamilyDetails(relation, idx, 'occupation', e.target.value)}
                                    />
                                    <div className="create-biodata-sibling-radio-group">
                                        <label>Married:</label>
                                        <label className="sibling-radio-option">
                                            <input
                                                type="radio"
                                                className="create-biodata-sibling-radio-input"
                                                name={`married-${relation}-${idx}`}
                                                value="No"
                                                checked={sibling.married === 'No'}
                                                onChange={(e) => setFamilyDetails(relation, idx, 'married', e.target.value)}
                                            />
                                            <span>No</span>
                                        </label>
                                        <label className="sibling-radio-option">
                                            <input
                                                type="radio"
                                                className="create-biodata-sibling-radio-input"
                                                name={`married-${relation}-${idx}`}
                                                value="Yes"
                                                checked={sibling.married === 'Yes'}
                                                onChange={(e) => setFamilyDetails(relation, idx, 'married', e.target.value)}
                                            />
                                            <span>Yes</span>
                                        </label>
                                    </div>
                                    <button type="button" onClick={() => handleRemoveSibling(relation, idx)} className="create-biodata-delete-btn">
                                        Remove {relation === 'brothers' ? 'Brother' : 'Sister'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>
          </>
        );
      case 5: //Contact Information
        return (
            <div className="create-biodata-section">
              <h2>Contact Information</h2>
              <textarea
                placeholder="Address"
                value={formData.contactDetails.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactDetails: {
                      ...formData.contactDetails,
                      address: e.target.value,
                    },
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={formData.contactDetails.mobile}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactDetails: {
                      ...formData.contactDetails,
                      mobile: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
        );
      case 6: // Preview Section
      return (
        <div className="create-biodata-preview">
            <h2>Preview Your Biodata</h2>

            <div className="preview-section">
                {/* Personal Information */}
                <section className="preview-group">
                    <h3>Personal Information</h3>
                    <div className="preview-details">
                        {/* Personal Data */}
                        {formData.personalDetails?.map((field, index) => (
                            <p key={index}>
                                <strong>{field.label}:</strong> {field.value || "Not Provided"}
                            </p>
                        ))}
                    </div>
                </section>
                   {/* Professional Information */}
                <section className="preview-group">
                    <h3>Professional Information</h3>
                    <div className="preview-details">
                        {formData.professionalDetails.map((field, index) => (
                            <p key={index}>
                                <strong>{field.label}:</strong> {field.value || "Not Provided"}
                            </p>
                        ))}
                    </div>
                </section>

                {/* Education Information */}
                <section className="preview-group">
                    <h3>Education Information</h3>
                    <div className="preview-details">
                        {formData.educationDetails.map((eduGroup, index) => (
                            <div key={index} className="education-item">
                                <h4>Education {formData.educationDetails.length - index}</h4>
                                {eduGroup.map((field, fieldIndex) => (
                                    <p key={fieldIndex}>
                                        <strong>{field.label}:</strong> {field.value || "Not Provided"}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Family Information */}
                <section className="preview-group">
                    <h3>Family Information</h3>
                    <div className="preview-details">
                        {/* Parents Section */}
                        {['father', 'mother'].map((relation) => (
                            <div key={relation} className="family-item">
                                <h4>{formData.familyDetails?.[relation]?.label}</h4>
                                <p><strong>Name:</strong> {formData.familyDetails?.[relation]?.value?.name || "Not Provided"}</p>
                                <p><strong>Occupation:</strong> {formData.familyDetails?.[relation]?.value?.occupation || "Not Provided"}</p>
                            </div>
                        ))}

                        {/* Siblings Section */}
                        {['brothers', 'sisters'].map((relation) => (
                            <div key={relation} className="family-item">
                                <h4>{formData.familyDetails?.[relation]?.label}</h4>
                                {formData.familyDetails?.[relation]?.value?.map((sibling, idx) => (
                                    <div key={idx} className="sibling-item">
                                        <p><strong>Name:</strong> {sibling?.name || "Not Provided"}</p>
                                        <p><strong>Occupation:</strong> {sibling?.occupation || "Not Provided"}</p>
                                        <p><strong>Married:</strong> {sibling?.married || "Not Provided"}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Information */}
                <section className="preview-group">
                    <h3>Contact Information</h3>
                    <div className="preview-details">
                        <p><strong>Address:</strong> {formData.contactDetails?.address || "Not Provided"}</p>
                        <p><strong>Mobile:</strong> {formData.contactDetails?.mobile || "Not Provided"}</p>
                    </div>
                </section>
            </div>
        </div>
    );


    }
  };

  return (
    <>
      <div className="create-biodata-stepper">
        <div className="create-biodata-stepper-header">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`create-biodata-step ${
                index === currentStep ? "active" : ""
              } ${index < currentStep ? "completed" : ""}`}
            >
              <div className="create-biodata-step-number">{index +1}</div>
              <div className="create-biodata-step-label">{step === 'Professional' && modelDetails?.type === ModelTypes.Student.Name ? 'Examination': step}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="create-biodata-stepper-form">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="create-biodata-form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="create-biodata-nav-button prev"
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              type="submit"
              className="create-biodata-nav-button next"
              // disabled={isLoading}
            >
              {currentStep === steps.length - 1
                ? isLoading
                  ? "Saving..."
                  : "Save and Preview"
                : "Next"}
            </button>
          </div>
        </form>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default CreateBiodata;
