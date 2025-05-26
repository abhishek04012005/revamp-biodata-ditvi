import Languages from '../json/Languages';
import {
  PersonalData,
  ProfessionalData,
  EducationData,
  FamilyData,
  ExaminationData,
  ContactData
} from "../json/createBiodata";

import {
  PersonalDataHindi,
  ProfessionalDataHindi,
  EducationDataHindi,
  FamilyDataHindi,
  ExaminationDataHindi,
  ContactDataHindi
} from "../json/CreateBiodataHindi";
import ModelTypes from './ModelTypes';

export const getLanguageData = (modelDetails) => {
    const isModelTypeProfessional = modelDetails.type === ModelTypes.Professional.Name;
    const isLanguageHindi = modelDetails.language === Languages.Hindi.Name;
  if (isLanguageHindi) {
    return {
      personal: PersonalDataHindi,
      professional: ProfessionalDataHindi,
      education: EducationDataHindi,
      family: FamilyDataHindi,
      examination: ExaminationDataHindi,
      contact: ContactDataHindi,
      steps: [
        "प्रोफाइल छवि",
        "व्यक्तिगत",
        isModelTypeProfessional ? "व्यावसायिक": "परीक्षा",
        "शैक्षिक",
        "पारिवारिक",
        "संपर्क",
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
      },
      biodataMaster: {
        personalDetails: "व्यक्तिगत विवरण",
        professionalDetails: "व्यावसायिक विवरण",
        examinationDetails: "परीक्षा विवरण",
        educationDetails: "शैक्षिक विवरण",
        familyDetails: "पारिवारिक विवरण",
        contactDetails: "संपर्क विवरण",
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
      isModelTypeProfessional ? "Professional": "Examination",
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
    },
    biodataMaster: {
      personalDetails: "Personal Details",
      professionalDetails: "Professional Details",
      examinationDetails: "Examination Details",
      educationDetails: "Education Details",
      familyDetails: "Family Details",
      contactDetails: "Contact Details",
    }
  };
};
