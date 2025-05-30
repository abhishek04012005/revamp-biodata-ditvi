import { People, Add, Delete } from "@mui/icons-material";
import { createEmptyPerson } from "../../../../json/createBiodata";
import { MAXIMUM_SIBLINGS } from "../../../../utils/Constants";

export const FamilyInfoSection = ({
  formData,
  setFormData,
  isEditing,
  langData,
}) => {
  const getTotalSiblings = () => {
    return (
      formData.familyDetails.brothers.value.length +
      formData.familyDetails.sisters.value.length
    );
  };

  const handleAddSibling = (relation) => {
    if (getTotalSiblings() < MAXIMUM_SIBLINGS) {
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
    }
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

  return renderSection(
    <People />,
    langData?.biodataMaster.familyDetails || "Family Details",
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
                    {formData.familyDetails[relation].value.name}
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
                    {formData.familyDetails[relation].value.occupation}
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
            {isEditing && getTotalSiblings() < MAXIMUM_SIBLINGS && (
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
                    <span className="field-value">{sibling.name}</span>
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
                    <span className="field-value">{sibling.occupation}</span>
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
