/* eslint-disable default-case */
import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from "../../structure/Loader/Loader";
import "./CreateBiodata.css";
import {
  defaultName,
  personalData,
  professionalData,
  educationData,
  familyData,
  contactData,
} from "../../json/createBiodata";
import { Mode } from "@mui/icons-material";
import ModelTypes from "../../json/ModelTypes";

const CreateBiodata = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { requestNumber, userDetails, modelDetails } = location.state || {};

  const [formData, setFormData] = useState({
    profileImage: null,
    name: defaultName,
    personalData: personalData.map(({ label, value }) => ({ label, value })),
    professionalData: [...professionalData],
    examPreparing: {
      name: "",
      subject: "",
      year: "",
    },
    examPreparing: {
      name: "",
    },
    examQualified: {
      name: "",
    },
    educationData: [...educationData],
    familyData: [...familyData],
    contactData: contactData,
    biodataDetails: {
      modelNumber: null,
      language: null,
      modelType: "student",
      guestName: null,
      mobileNumber: null,
    },
    guestDetailId: null,
    requestNumber: null,
    status: [
      {
        status: 1,
        status_number: 1,
        updated_at: new Date().toISOString(),
      },
    ],
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
    if (formData.educationData.length < 5) {
      setFormData((prev) => ({
        ...prev,
        educationData: [
          { degree: "", institution: "", year: "", score: "" },
          ...prev.educationData,
        ],
      }));
    }
  };

  const handleDeleteEducation = (indexToDelete) => {
    if (formData.educationData.length > 1) {
      setFormData((prev) => ({
        ...prev,
        educationData: prev.educationData.filter(
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

    // Validate contact data
    if (!formData.contactData?.address || !formData.contactData?.mobile) {
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
              {formData.personalData.map((field, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={field.label}
                  value={field.value}
                  onChange={(e) => {
                    const newPersonalData = [...formData.personalData];
                    newPersonalData[index].value = e.target.value;
                    setFormData({ ...formData, personalData: newPersonalData });
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
                      formData.professionalData[0].examPreparing?.name || ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        professionalData: [
                          {
                            ...formData.professionalData[0],
                            examPreparing: {
                              ...formData.professionalData[0].examPreparing,
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
                      formData.professionalData[0].examQualified?.name || ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        professionalData: [
                          {
                            ...formData.professionalData[0],
                            examQualified: {
                              ...formData.professionalData[0].examQualified,
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
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.professionalData[0].company}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      professionalData: [
                        {
                          ...formData.professionalData[0],
                          company: e.target.value,
                        },
                      ],
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={formData.professionalData[0].position}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      professionalData: [
                        {
                          ...formData.professionalData[0],
                          position: e.target.value,
                        },
                      ],
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Experience (years)"
                  value={formData.professionalData[0].experience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      professionalData: [
                        {
                          ...formData.professionalData[0],
                          experience: e.target.value,
                        },
                      ],
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Salary (LPA)"
                  value={formData.professionalData[0].salary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      professionalData: [
                        {
                          ...formData.professionalData[0],
                          salary: e.target.value,
                        },
                      ],
                    })
                  }
                  required
                />
              </div>
            )}
          </div>
        );
      case 3: //Education Information
        return (
          <>
            <div className="create-biodata-section">
              <h2>Education Information</h2>

              {formData.educationData.length < 5 && (
                <button
                  type="button"
                  className="create-biodata-add-btn"
                  onClick={handleAddEducation}
                >
                  + Add Education ({5 - formData.educationData.length}{" "}
                  remaining)
                </button>
              )}

              {formData.educationData.map((education, index) => (
                <div key={index} className="education-group">
                  <div className="education-header">
                    <h3>Education {formData.educationData.length - index}</h3>
                  </div>
                  <div className="education-inputs">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={education.degree}
                      onChange={(e) => {
                        const newEducationData = [...formData.educationData];
                        newEducationData[index] = {
                          ...newEducationData[index],
                          degree: e.target.value,
                        };
                        setFormData({
                          ...formData,
                          educationData: newEducationData,
                        });
                      }}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={education.institution}
                      onChange={(e) => {
                        const newEducationData = [...formData.educationData];
                        newEducationData[index] = {
                          ...newEducationData[index],
                          institution: e.target.value,
                        };
                        setFormData({
                          ...formData,
                          educationData: newEducationData,
                        });
                      }}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={education.year}
                      onChange={(e) => {
                        const newEducationData = [...formData.educationData];
                        newEducationData[index] = {
                          ...newEducationData[index],
                          year: e.target.value,
                        };
                        setFormData({
                          ...formData,
                          educationData: newEducationData,
                        });
                      }}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Score"
                      value={education.score}
                      onChange={(e) => {
                        const newEducationData = [...formData.educationData];
                        newEducationData[index] = {
                          ...newEducationData[index],
                          score: e.target.value,
                        };
                        setFormData({
                          ...formData,
                          educationData: newEducationData,
                        });
                      }}
                      required
                    />

                    {formData.educationData.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteEducation(index)}
                        className="create-biodata-delete-btn"
                      >
                        Remove Education {formData.educationData.length - index}
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

              {/* Parents */}
              {formData.familyData.slice(0, 2).map((member, index) => (
                <div key={index} className="create-biodata-family-group">
                  <h3>{member.relation}</h3>
                  <div className="create-biodata-family-inputs">
                    <input
                      type="text"
                      placeholder="Name"
                      value={member.name[0] || ""}
                      onChange={(e) => {
                        const newFamilyData = [...formData.familyData];
                        newFamilyData[index].name = [e.target.value];
                        setFormData({ ...formData, familyData: newFamilyData });
                      }}
                      required
                    />
                    <input
                      style={{ display: "none" }}
                      type="text"
                      value="-"
                      disabled
                      className="married-status-disabled"
                    />
                    <input
                      type="text"
                      placeholder="Occupation"
                      value={member.occupation[0] || ""}
                      onChange={(e) => {
                        const newFamilyData = [...formData.familyData];
                        newFamilyData[index].occupation = [e.target.value];
                        setFormData({ ...formData, familyData: newFamilyData });
                      }}
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Brother Section */}
              <div className="create-biodata-family-group">
                <div className="sibling-header">
                  <h3>Brother(s)</h3>
                  {formData.familyData[2].name.length +
                    formData.familyData[3].name.length <
                    6 && (
                    <button
                      type="button"
                      // onClick={() => handleAddSibling('brother')}
                      className="create-biodata-add-btn"
                    >
                      + Add Brother
                    </button>
                  )}
                </div>
                <div className="create-biodata-siblings-grid">
                  {formData.familyData[2].name.map((name, idx) => (
                    <div className="create-biodata-sibling-row">
                      <div className="create-biodata-sibling-inputs">
                        <input
                          type="text"
                          placeholder={`Brother ${idx + 1} Name`}
                          value={name}
                          onChange={(e) => {
                            const newFamilyData = [...formData.familyData];
                            newFamilyData[2].name[idx] = e.target.value;
                            setFormData({
                              ...formData,
                              familyData: newFamilyData,
                            });
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Occupation"
                          value={formData.familyData[2].occupation[idx] || ""}
                          onChange={(e) => {
                            const newFamilyData = [...formData.familyData];
                            newFamilyData[2].occupation[idx] = e.target.value;
                            setFormData({
                              ...formData,
                              familyData: newFamilyData,
                            });
                          }}
                        />
                        <div className="create-biodata-sibling-radio-group">
                          <label htmlFor="married">Married: </label>
                          <label className="sibling-radio-option">
                            <input
                              type="radio"
                              className="create-biodata-sibling-radio-input"
                              name={`married-brother-${idx}`}
                              value="No"
                              checked={
                                formData.familyData[2].married[idx] === "No"
                              }
                              onChange={(e) => {
                                const newFamilyData = [...formData.familyData];
                                newFamilyData[2].married[idx] = e.target.value;
                                setFormData({
                                  ...formData,
                                  familyData: newFamilyData,
                                });
                              }}
                            />
                            <span className="create-biodata-sibling-radio-label">
                              No
                            </span>
                          </label>
                          <label className="create-biodata-sibling-radio-option">
                            <input
                              type="radio"
                              className="create-biodata-sibling-radio-input"
                              name={`married-brother-${idx}`}
                              value="Yes"
                              checked={
                                formData.familyData[2].married[idx] === "Yes"
                              }
                           
                              onChange={(e) => {
                                const newFamilyData = [...formData.familyData];
                                newFamilyData[2].married[idx] = e.target.value;
                                setFormData({
                                  ...formData,
                                  familyData: newFamilyData,
                                });
                              }}
                            />
                            <span className="create-biodata-sibling-radio-label">
                              Yes
                            </span>
                          </label>
                        </div>
                        <button
                          type="button"
                          //   onClick={() => handleRemoveSibling("brother", idx)}
                          className="create-biodata-delete-btn"
                        >
                          Remove Brother
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sister Section */}

              <div className="create-biodata-family-group"></div>
            </div>
          </>
        );
      case 5: //Contact Information
        return (
          <>
            <div className="create-biodata-section">
              <h2>Contact Information</h2>
              <textarea
                placeholder="Address"
                value={formData.contactData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactData: {
                      ...formData.contactData,
                      address: e.target.value,
                    },
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={formData.contactData.mobile}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactData: {
                      ...formData.contactData,
                      mobile: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
          </>
        );
      case 6: // Preview Section
        return (
          <div className="create-biodata-preview">
            <h2>Preview Your Biodata</h2>

            <div className="preview-section">
              <div className="preview-image">
                {formData.profileImage && (
                  <img src={formData.profileImage} alt="Profile Preview" />
                )}
              </div>

              <div className="preview-content">
                <section className="preview-group">
                  <h3>Personal Information</h3>
                  <div className="preview-details">
                    <p>
                      <strong>Name:</strong> {formData.name.value}
                    </p>
                    {formData.personalData.map((field, index) => (
                      <p key={index}>
                        <strong>{field.label}:</strong> {field.value}
                      </p>
                    ))}
                  </div>
                </section>

                <section className="preview-group">
                  <h3>
                    {formData.biodataDetails?.modelType === "student"
                      ? "Job Preparing Details"
                      : "Professional Information"}
                  </h3>
                  <div className="preview-details">
                    {formData.biodataDetails?.modelType === "student" ? (
                      <>
                        <p>
                          <strong>Examination Preparing:</strong>{" "}
                          {formData.professionalData[0].examPreparing?.name ||
                            "N/A"}
                        </p>
                        <p>
                          <strong>Examination Qualified:</strong>{" "}
                          {formData.professionalData[0].examQualified?.name ||
                            "N/A"}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>Company:</strong>{" "}
                          {formData.professionalData[0].company}
                        </p>
                        <p>
                          <strong>Position:</strong>{" "}
                          {formData.professionalData[0].position}
                        </p>
                        <p>
                          <strong>Experience:</strong>{" "}
                          {formData.professionalData[0].experience} years
                        </p>
                        <p>
                          <strong>Salary:</strong> ₹
                          {formData.professionalData[0].salary} LPA
                        </p>
                      </>
                    )}
                  </div>
                </section>

                <section className="preview-group">
                  <h3>Education Information</h3>
                  <div className="preview-details">
                    {formData.educationData.map((edu, index) => (
                      <div key={index} className="education-item">
                        <h4>
                          Education {formData.educationData.length - index}
                        </h4>
                        <p>
                          <strong>Degree:</strong> {edu.degree}
                        </p>
                        <p>
                          <strong>Institution:</strong> {edu.institution}
                        </p>
                        <p>
                          <strong>Year:</strong> {edu.year}
                        </p>
                        <p>
                          <strong>Score:</strong> {edu.score}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="preview-group">
                  <h3>Family Information</h3>
                  <div className="preview-details">
                    {formData.familyData.slice(0, 2).map((member, index) => (
                      <div key={index} className="family-item">
                        <h4>{member.relation}</h4>
                        <p>
                          <strong>Name:</strong> {member.name[0]}
                        </p>
                        <p>
                          <strong>Occupation:</strong> {member.occupation[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="preview-group">
                  <h3>Contact Information</h3>
                  <div className="preview-details">
                    <p>
                      <strong>Address:</strong> {formData.contactData.address}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {formData.contactData.mobile}
                    </p>
                  </div>
                </section>
              </div>
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
