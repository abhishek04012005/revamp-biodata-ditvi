import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../structure/Loader/Loader";
import "./CreateBiodata.css";
import {
  PersonalData,
  ProfessionalData,
  EducationData,
  createEmptyPerson,
  FamilyData,
  ExaminationData,
  ContactData,
} from "../../json/createBiodata";

import {
  PersonalDataHindi,
  ProfessionalDataHindi,
  EducationDataHindi,
  FamilyDataHindi,
  ExaminationDataHindi,
  createEmptyPersonHindi,
  ContactDataHindi
} from "../../json/CreateBiodataHindi";


import ModelTypes from "../../json/ModelTypes";
import Languages from "../../json/Languages";
import { UploadFile } from '../../supabase/UploadFile';
import { BiodataRequestStorage } from "../../supabase/BiodataRequest";
import StorageBucket from "../../constants/StorageBucket";

const CreateBiodata = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { requestNumber, userDetails, modelDetails } = location.state || {};

  const getDataByLanguage = () => {
    console.log("modelDetails", modelDetails);
    console.log("PersonalDataHindi", PersonalDataHindi);
    if (modelDetails?.language === Languages.Hindi.Name) {
      return {
        personal: PersonalDataHindi,
        professional: ProfessionalDataHindi,
        education: EducationDataHindi,
        family: FamilyDataHindi,
        examination: ExaminationDataHindi,
        contact: ContactDataHindi,
        steps: [
          "प्रोफाइल छवि",
          "व्यक्तिगत जानकारी",
          "व्यावसायिक जानकारी",
          "शैक्षिक जानकारी",
          "पारिवारिक जानकारी",
          "संपर्क जानकारी",
          "पूर्वावलोकन",
        ],
        placeholders: {
          addEducation: "शिक्षा जोड़ें",
          remaining: "शेष",
          addBrother: "भाई जोड़ें",
          addSister: "बहन जोड़ें",
          occupation: "व्यवसाय",
          name: "नाम",
          maritalStatus: "वैवाहिक स्थिति",
          married: "विवाहित",
          notProvided: "उपलब्ध नहीं",
          yes: "हाँ",
          no: "नहीं",
        }
      };
    }
    return {
      personal: PersonalData,
      professional: ProfessionalData,
      education: EducationData,
      family: FamilyData,
      examination: ExaminationData,
      contact: ContactData,
      steps: [
        "Profile Image",
        "Personal",
        "Professional",
        "Education",
        "Family",
        "Contact",
        "Preview",
      ],
      placeholders: {
        addEducation: "Add Education",
        remaining: "remaining",
        addBrother: "Add Brother",
        addSister: "Add Sister",
        occupation: "Occupation",
        name: "Name",
        married: "Married",
        notProvided: "Not Provided",
        yes: "Yes",
        no: "No",
      }
    };
  };

  const langData = getDataByLanguage();

  console.log("langData", langData);

  const [formData, setFormData] = useState({
    profileImage: null,
    name: "",
    userDetails: userDetails,
    modelDetails: modelDetails,
    personalDetails: langData.personal.map(({ label, value, placeholder }) => ({
      label,
      value,
      placeholder,
    })),
    professionalDetails: langData.professional.map(
      ({ label, value, placeholder }) => ({ label, value, placeholder })
    ),
    examinaitonDetails: langData.examination.map(
      ({ label, value, placeholder }) => ({ label, value, placeholder })
    ),
    educationDetails: [
      langData.education.map(({ label, value, placeholder }) => ({
        label,
        value,
        placeholder,
      })),
    ],
    familyDetails: langData.family,
    contactDetails: langData.contact.map(
      ({ label, value, placeholder }) => ({ label, value, placeholder })
    ),
  });

  const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, langData.steps.length - 1));
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
      setFormData((prev) => ({
        ...prev,
        educationDetails: [
          langData.education.map(({ label }) => ({ label, value: "" })),
          ...prev.educationDetails,
        ],
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

     if (currentStep === 0 && !formData.profileImage) {
        alert("Please upload a profile image before proceeding");
        return;
    }

    if (currentStep !== langData.steps.length - 1) {
      handleNext();
      return;
    }

    try {
      setIsLoading(true);
      const profileUrl = await UploadFile(selectedImage, `${requestNumber}_profile`, StorageBucket.CREATE_BIODATA);
      const response =
        await BiodataRequestStorage.saveBiodataRequestFromCreateBiodata({
          requestNumber: requestNumber,
          userDetails: userDetails,
          modelDetails: modelDetails,
          profileUrl: profileUrl,
          personalDetails: formData.personalDetails,
          professionalDetails: formData.professionalDetails,
          examinationDetails: formData.examinaitonDetails,
          educationDetails: formData.educationDetails,
          familyDetails: formData.familyDetails,
          contactDetails: formData.contactDetails,
        });

        setIsLoading(false);
        navigate('/confirmation', { state: { 
            requestNumber: requestNumber,
            userDetails: userDetails,
            modelDetails: modelDetails,
         } });
      console.log("Biodata saved successfully:", response);
    } catch (error) {
      console.error("Error saving biodata:", error);
      alert("Failed to save biodata");
    }
  };



  const setFamilyDetails = (relation, index, key, value) => {
    setFormData((prev) => ({
      ...prev,
      familyDetails: {
        ...prev.familyDetails,
        [relation]: {
          ...prev.familyDetails[relation],
          value: Array.isArray(prev.familyDetails[relation].value)
            ? prev.familyDetails[relation].value.map((person, i) =>
                i === index ? { ...person, [key]: value } : person
              )
            : { ...prev.familyDetails[relation].value, [key]: value },
        },
      },
    }));
  };

  // Function to add a sibling (brother/sister)
  const handleAddSibling = (relation) => {
    if (formData.familyDetails[relation].value.length < 6) {
      setFormData((prev) => ({
        ...prev,
        familyDetails: {
          ...prev.familyDetails,
          [relation]: {
            ...prev.familyDetails[relation],
            value: [modelDetails?.language === Languages.Hindi.Name ? 
              createEmptyPersonHindi() : createEmptyPerson(), ...prev.familyDetails[relation].value],
          },
        },
      }));
    }
  };

  // Function to remove a sibling (brother/sister)
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
                  onChange={handleImageChange}
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
      case 1: //Personal Details
        return (
          <>
            <div className="create-biodata-section">
              <h2>Personal Details</h2>
              {formData.personalDetails.map((field, index) => (
                <>
                  <div className="create-biodata-label-input">
                    <label className="create-biodata-label">
                      {field.label}:
                    </label>
                    <input
                      key={index}
                      type="text"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => {
                        const newPersonalData = [...formData.personalDetails];
                        newPersonalData[index].value = e.target.value;
                        setFormData({
                          ...formData,
                          personalDetails: newPersonalData,
                        });
                      }}
                      required
                    />
                  </div>
                </>
              ))}
            </div>
          </>
        );
      case 2: // Professional/Examination Details
        return (
          <div className="create-biodata-section">
            <h2>
              {modelDetails?.type === ModelTypes.Student.Name
                ? "Examination Preparation Details"
                : "Professional Details"}
            </h2>
            {modelDetails?.type === ModelTypes.Student.Name ? (
              <div className="professional-inputs">
                {formData.examinaitonDetails.map((field, index) => (
                  <div className="create-biodata-label-input">
                    <label className="create-biodata-label">
                      {field.label}:
                    </label>
                    <input
                      key={index}
                      type="text"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => {
                        const newExaminaitonDetails = [
                          ...formData.examinaitonDetails,
                        ];
                        newExaminaitonDetails[index].value = e.target.value;
                        setFormData({
                          ...formData,
                          examinaitonDetails: newExaminaitonDetails,
                        });
                      }}
                      required
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="professional-inputs">
                {formData.professionalDetails.map((field, index) => (
                  <div className="create-biodata-label-input">
                    <label className="create-biodata-label">
                      {field.label}:
                    </label>
                    <input
                      key={index}
                      type="text"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => {
                        const newProfessionalDetails = [
                          ...formData.professionalDetails,
                        ];
                        newProfessionalDetails[index].value = e.target.value;
                        setFormData({
                          ...formData,
                          professionalDetails: newProfessionalDetails,
                        });
                      }}
                      required
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 3: //Education Details
        return (
          <>
            <div className="create-biodata-section">
              <h2>Education Details</h2>
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
                    <h3>
                      Education {formData.educationDetails.length - index}
                    </h3>
                  </div>
                  <div className="education-inputs">
                    {educationGroup.map((field, fieldIndex) => (
                      <div className="create-biodata-label-input">
                        <label className="create-biodata-label">
                          {field.label}:
                        </label>
                        <input
                          key={fieldIndex}
                          type="text"
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={(e) => {
                            const newEducationData =
                              formData.educationDetails.map((group, i) =>
                                i === index
                                  ? group.map((f, fi) =>
                                      fi === fieldIndex
                                        ? { ...f, value: e.target.value }
                                        : f
                                    )
                                  : group
                              );
                            setFormData({
                              ...formData,
                              educationDetails: newEducationData,
                            });
                          }}
                          required
                        />
                      </div>
                    ))}
                    {formData.educationDetails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteEducation(index)}
                        className="create-biodata-delete-btn"
                      >
                        Remove Education{" "}
                        {formData.educationDetails.length - index}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case 4: //Family Details
        return (
          <>
            <div className="create-biodata-section">
              <h2>Family Details</h2>

              {/* Parents Section */}
              {["father", "mother"].map((relation) => (
                <div key={relation} className="create-biodata-family-group">
                  <h3>{formData.familyDetails[relation].label}</h3>
                  <div className="create-biodata-family-inputs">
                    <div className="create-biodata-label-input">
                      <label className="create-biodata-label">{langData.placeholders.name}:</label>
                      <input
                        type="text"
                        placeholder={formData.familyDetails[relation].placeholder}
                        value={formData.familyDetails[relation].value.name}
                        onChange={(e) =>
                          setFamilyDetails(
                            relation,
                            null,
                            "name",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <input
                      style={{ display: "none" }}
                      type="text"
                      value="Yes"
                      disabled
                      className="married-status-disabled"
                    />
                    <div className="create-biodata-label-input">
                      <label className="create-biodata-label">
                        {langData.placeholders.occupation}:
                      </label>
                      <input
                        type="text"
                        placeholder={relation === "father" ? "Goverment Service" : "Housewife"}
                        value={
                          formData.familyDetails[relation].value.occupation
                        }
                        onChange={(e) =>
                          setFamilyDetails(
                            relation,
                            null,
                            "occupation",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Sibling Section */}
              {["brothers", "sisters"].map((relation) => (
                <div key={relation} className="create-biodata-family-group">
                  <div className="sibling-header">
                    <h3>{formData.familyDetails[relation].label}</h3>
                    {formData.familyDetails[relation].value.length < 6 && (
                      <button
                        type="button"
                        onClick={() => handleAddSibling(relation)}
                        className="create-biodata-add-btn"
                      >
                        + Add {relation === "brothers" ? "Brother" : "Sister"}
                      </button>
                    )}
                  </div>
                  <div className="create-biodata-siblings-grid">
                    {formData.familyDetails[relation].value.map(
                      (sibling, idx) => (
                        <div key={idx} className="create-biodata-sibling-row">
                          <div className="create-biodata-sibling-inputs">
                            <div className="create-biodata-label-input">
                              <label className="create-biodata-label">
                                {langData.placeholders.name}:
                              </label>
                              <input
                                type="text"
                                placeholder={`${
                                  relation === "brothers" ? "Brother" : "Sister"
                                } ${
                                  formData.familyDetails[relation].value
                                    .length - idx
                                } Name`}
                                value={sibling.name}
                                onChange={(e) =>
                                  setFamilyDetails(
                                    relation,
                                    idx,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="create-biodata-label-input">
                              <label className="create-biodata-label">
                                {langData.placeholders.occupation}:
                              </label>
                              <input
                                type="text"
                                placeholder="Occupation"
                                value={sibling.occupation}
                                onChange={(e) =>
                                  setFamilyDetails(
                                    relation,
                                    idx,
                                    "occupation",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="create-biodata-sibling-radio-group">
                              <label className="create-biodata-label">
                                {langData.placeholders.married}:
                              </label>
                              <label className="sibling-radio-option">
                                <input
                                  type="radio"
                                  className="create-biodata-sibling-radio-input"
                                  name={`married-${relation}-${idx}`}
                                  value={langData.placeholders.no}
                                  checked={sibling.married === langData.placeholders.no}
                                  onChange={(e) =>
                                    setFamilyDetails(
                                      relation,
                                      idx,
                                      "married",
                                      e.target.value
                                    )
                                  }
                                />
                                <span>{langData.placeholders.no}</span>
                              </label>
                              <label className="sibling-radio-option">
                                <input
                                  type="radio"
                                  className="create-biodata-sibling-radio-input"
                                  name={`married-${relation}-${idx}`}
                                  value={langData.placeholders.yes}
                                  checked={sibling.married === langData.placeholders.yes}
                                  onChange={(e) =>
                                    setFamilyDetails(
                                      relation,
                                      idx,
                                      "married",
                                      e.target.value
                                    )
                                  }
                                />
                                <span>{langData.placeholders.yes}</span>
                              </label>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveSibling(relation, idx)}
                              className="create-biodata-delete-btn"
                            >
                              Remove{" "}
                              {relation === "brothers" ? "Brother" : "Sister"}
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case 5: //Contact Details
            return (
              <div className="create-biodata-section">
                <h2>Contact Details</h2>
                {formData.contactDetails.map((field, index) => (
                  <div key={index} className="create-biodata-label-input">
                    <label className="create-biodata-label">{field.label}:</label>
                    {field.label.toLowerCase().includes('address') ? (
                      <textarea
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => {
                          const newContactDetails = [...formData.contactDetails];
                          newContactDetails[index].value = e.target.value;
                          setFormData({
                            ...formData,
                            contactDetails: newContactDetails,
                          });
                        }}
                        required
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => {
                          const newContactDetails = [...formData.contactDetails];
                          newContactDetails[index].value = e.target.value;
                          setFormData({
                            ...formData,
                            contactDetails: newContactDetails,
                          });
                        }}
                        required
                      />
                    )}
                  </div>
                ))}
              </div>
            );
      case 6: // Preview Section
        return (
          <div className="create-biodata-preview">
            <h2>Preview Your Biodata</h2>

            <div className="preview-section">
              {/* Profile Image */}
              {formData.profileImage && (
                <section className="preview-group profile-image-preview">
                  <h3>Profile Image</h3>
                  <div className="preview-image-container">
                    <img
                      src={formData.profileImage}
                      alt="Profile Preview"
                      className="preview-profile-image"
                    />
                  </div>
                </section>
              )}
              {/* Personal Details */}
              <section className="preview-group">
                <h3>Personal Details</h3>
                <div className="preview-details">
                  {/* Personal Data */}
                  {formData.personalDetails?.map((field, index) => (
                    <p key={index}>
                      <strong>{field.label}:</strong>{" "}
                      {field.value || "Not Provided"}
                    </p>
                  ))}
                </div>
              </section>

              {/* Professional/Examination Details */}
                <section className="preview-group">
                  <h3>
                    {modelDetails?.type === ModelTypes.Student.Name
                      ? "Examination Preparation Details"
                      : "Professional Details"}
                  </h3>
                  <div className="preview-details">
                    {modelDetails?.type === ModelTypes.Student.Name ? (
                      // Examination Details
                      formData.examinaitonDetails.map((field, index) => (
                        <p key={index}>
                          <strong>{field.label}:</strong>{" "}
                          {field.value || "Not Provided"}
                        </p>
                      ))
                    ) : (
                      // Professional Details
                      formData.professionalDetails.map((field, index) => (
                        <p key={index}>
                          <strong>{field.label}:</strong>{" "}
                          {field.value || "Not Provided"}
                        </p>
                      ))
                    )}
                  </div>
                </section>

              {/* Education Details */}
              <section className="preview-group">
                <h3>Education Details</h3>
                <div className="preview-details">
                  {formData.educationDetails.map((eduGroup, index) => (
                    <div key={index} className="education-item">
                      <h4>
                        Education {formData.educationDetails.length - index}
                      </h4>
                      {eduGroup.map((field, fieldIndex) => (
                        <p key={fieldIndex}>
                          <strong>{field.label}:</strong>{" "}
                          {field.value || "Not Provided"}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </section>

              {/* Family Details */}
              <section className="preview-group">
                <h3>Family Details</h3>
                <div className="preview-details">
                  {/* Parents Section */}
                  {["father", "mother"].map((relation) => (
                    <div key={relation} className="family-item">
                      <h4>{formData.familyDetails?.[relation]?.label}</h4>
                      {console.log("formData.familyDetails", formData.familyDetails)}
                      <p>
                        <strong>{langData.placeholders.name}:</strong>{" "}
                        {formData.familyDetails?.[relation]?.value?.name ||
                          "Not Provided"}
                      </p>
                      <p>
                        <strong>{langData.placeholders.occupation}:</strong>{" "}
                        {formData.familyDetails?.[relation]?.value
                          ?.occupation || "Not Provided"}
                      </p>
                    </div>
                  ))}

                  {/* Siblings Section */}
                  {["brothers", "sisters"].map((relation) => (
                    <div key={relation} className="family-item">
                      <h4>{formData.familyDetails?.[relation]?.label}</h4>
                      {formData.familyDetails?.[relation]?.value?.map(
                        (sibling, idx) => (
                          <div key={idx} className="sibling-item">
                            <p>
                              <strong>{langData.placeholders.name}:</strong>{" "}
                              {sibling?.name || "Not Provided"}
                            </p>
                            <p>
                              <strong>{langData.placeholders.occupation}:</strong>{" "}
                              {sibling?.occupation || "Not Provided"}
                            </p>
                            <p>
                              <strong>{langData.placeholders.married}:</strong>{" "}
                              {sibling?.married || "Not Provided"}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Details */}
              <section className="preview-group">
                <h3>Contact Details</h3>
                <div className="preview-details">
                  {formData.contactDetails.map((field, index) => (
                    <p key={index}>
                      <strong>{field.label}:</strong>{" "}
                      {field.value || "Not Provided"}
                    </p>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );
      default:
        return <div className="create-biodata-step-content">Step not found</div>;
      }
  };

  return (
    <>
      <div className="create-biodata-stepper">
        <div className="create-biodata-stepper-header">
          {langData.steps.map((step, index) => (
            <div
              key={index}
              className={`create-biodata-step ${
                index === currentStep ? "active" : ""
              } ${index < currentStep ? "completed" : ""}`}
            >
              <div className="create-biodata-step-number">{index + 1}</div>
              <div className="create-biodata-step-label">
                {step === "Professional" &&
                modelDetails?.type === ModelTypes.Student.Name
                  ? "Examination"
                  : step}
              </div>
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
              {currentStep === langData.steps.length - 1
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
