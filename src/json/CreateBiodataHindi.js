import { Height, Palette, Person, CalendarMonth } from "@mui/icons-material";

const ICON_MAPPING_HINDI = {
  "जन्म तिथि": <CalendarMonth className="g1111-icon" />,
  ऊंचाई: <Height className="g1111-icon" />,
  रंग: <Palette className="g1111-icon" />,
  जाति: <Person className="g1111-icon" />,
};

const PersonalDataHindi = [
  { label: "नाम", value: "", placeholder: "राजेश कुमार" },
  { label: "जन्म तिथि", value: "", placeholder: "15 अगस्त 1995" },
  { label: "ऊंचाई", value: "", placeholder: "5 फीट 8 इंच" },
  { label: "रंग", value: "", placeholder: "गहरा" },
  { label: "जाति", value: "", placeholder: "ब्राह्मण" },
];

const ProfessionalDataHindi = [
  { label: "कंपनी", value: "", placeholder: "TCS" },
  { label: "पद", value: "", placeholder: "सॉफ्टवेयर इंजीनियर" },
  { label: "अनुभव (वर्षों में)", value: "", placeholder: "3" },
  { label: "वेतन", value: "", placeholder: "10 LPA" },
];

const EducationDataHindi = [
  { label: "डिग्री", value: "", placeholder: "बी.टेक" },
  { label: "संस्थान", value: "", placeholder: "IIT दिल्ली" },
  { label: "साल", value: "", placeholder: "2018" },
  { label: "स्कोर", value: "", placeholder: "9.0 CGPA" },
];

const ExaminationDataHindi = [
  { label: "परीक्षा के लिए तैयारी", value: "", placeholder: "UPSC" },
  {
    label: "परीक्षा उत्तीर्ण",
    value: "",
    placeholder: `UPSC-${new Date().getFullYear() - 1} (Pre)`,
  },
];

const createEmptyPersonHindi = () => ({
  name: "",
  married: "नहीं",
  occupation: "",
});

const FamilyDataHindi = {
  father: {
    label: "पिता",
    value: createEmptyPersonHindi(),
    placeholder: "श्री राम शर्मा",
  },
  mother: {
    label: "माता",
    value: createEmptyPersonHindi(),
    placeholder: "श्रीमती सीता शर्मा",
  },
  brothers: { label: "भाई", value: [] },
  sisters: { label: "बहन", value: [] },
};

const ContactDataHindi = [
  { label: "पता", value: "", placeholder: "123 मुख्य सड़क, शहर, राज्य" },
  { label: "मोबाइल नंबर", value: "", placeholder: "9263767441" },
];

export {
  PersonalDataHindi,
  EducationDataHindi,
  ExaminationDataHindi,
  ProfessionalDataHindi,
  FamilyDataHindi,
  ContactDataHindi,
  ICON_MAPPING_HINDI,
  createEmptyPersonHindi,
};
