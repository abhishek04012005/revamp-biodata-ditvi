import { createEmptyPerson } from "../../../json/createBiodata";
import { createEmptyPersonHindi } from "../../../json/CreateBiodataHindi";
import Languages from "../../../json/Languages";

const FamilyDetailsSection = ({
  formData,
  setFormData,
  modelDetails,
  langData,
  currentStep,
}) => {
  const MAXIUM_SIBLINGS = 5;
  const isLanguageHindi = modelDetails.language === Languages.Hindi.Name;

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

  const handleAddSibling = (relation) => {
    if (formData.familyDetails[relation].value.length < MAXIUM_SIBLINGS) {
      setFormData((prev) => ({
        ...prev,
        familyDetails: {
          ...prev.familyDetails,
          [relation]: {
            ...prev.familyDetails[relation],
            value: [
              isLanguageHindi ? createEmptyPersonHindi() : createEmptyPerson(),
              ...prev.familyDetails[relation].value,
            ],
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

  return (
    <div className="create-biodata-section">
      <h2>{langData.steps[currentStep]}</h2>
      {/* Parents Section */}
      {["father", "mother"].map((relation) => (
        <div key={relation} className="create-biodata-family-group">
          <h3>{formData.familyDetails[relation].label}</h3>
          <div className="create-biodata-family-inputs">
            <div className="create-biodata-label-input">
              <label className="create-biodata-label">
                {langData.placeholders.name}:
              </label>
              <input
                type="text"
                placeholder={formData.familyDetails[relation].placeholder}
                value={formData.familyDetails[relation].value.name}
                onChange={(e) =>
                  setFamilyDetails(relation, null, "name", e.target.value)
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
                placeholder={
                  relation === "father" ? "Goverment Service" : "Housewife"
                }
                value={formData.familyDetails[relation].value.occupation}
                onChange={(e) =>
                  setFamilyDetails(relation, null, "occupation", e.target.value)
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
            {formData.familyDetails[relation].value.length <
              MAXIUM_SIBLINGS && (
              <button
                type="button"
                onClick={() => handleAddSibling(relation)}
                className="create-biodata-add-btn"
              >
                +{" "}
                {relation === "brothers"
                  ? langData.placeholders.addBrother
                  : langData.placeholders.addSister}
              </button>
            )}
          </div>
          <div className="create-biodata-siblings-grid">
            {formData.familyDetails[relation].value.map((sibling, idx) => (
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
                        formData.familyDetails[relation].value.length - idx
                      } Name`}
                      value={sibling.name}
                      onChange={(e) =>
                        setFamilyDetails(relation, idx, "name", e.target.value)
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
                    -{" "}
                    {relation === "brothers"
                      ? langData.placeholders.addBrother
                      : langData.placeholders.addSister}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FamilyDetailsSection;
