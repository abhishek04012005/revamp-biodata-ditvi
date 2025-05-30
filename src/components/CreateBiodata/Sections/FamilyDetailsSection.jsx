import { createEmptyPerson } from "../../../json/createBiodata";
import { createEmptyPersonHindi } from "../../../json/CreateBiodataHindi";
import Languages from "../../../json/Languages";
import { MAXIMUM_SIBLINGS } from "../../../utils/Constants";

const FamilyDetailsSection = ({
  formData,
  setFormData,
  modelDetails,
  langData,
  currentStep,
}) => {
  const isLanguageHindi = modelDetails.language === Languages.Hindi.Name;
  const occupationPlaceholder = {
    father: isLanguageHindi ? "सरकारी सेवा" : "Government Service",
    mother: isLanguageHindi ? "गृहिणी" : "Housewife",
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


   const getTotalSiblings = () => {
    return formData.familyDetails.brothers.value.length + 
           formData.familyDetails.sisters.value.length;
  };

  const handleAddSibling = (relation) => {
    if (getTotalSiblings() < MAXIMUM_SIBLINGS) {
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
                  relation === "father"
                    ? occupationPlaceholder.father
                    : occupationPlaceholder.mother
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
            {getTotalSiblings() <
              MAXIMUM_SIBLINGS && (
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
                        relation === "brothers"
                          ? langData.placeholders.brother
                          : langData.placeholders.sister
                      } ${
                        formData.familyDetails[relation].value.length - idx
                      } ${langData.placeholders.name}`}
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
                      placeholder={langData.placeholders.occupation}
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
                      ? langData.placeholders.removeBrother
                      : langData.placeholders.removeSister}
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
