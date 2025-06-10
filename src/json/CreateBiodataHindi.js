import { Height, Palette, Person, CalendarMonth } from "@mui/icons-material";

const ICON_MAPPING_HINDI = {
  "जन्म तिथि": <CalendarMonth className="g1111-icon" />,
  ऊंचाई: <Height className="g1111-icon" />,
  रंग: <Palette className="g1111-icon" />,
  जाति: <Person className="g1111-icon" />,
};

const PersonalDataHindi = [
  { label: "नाम", value: "", placeholder: "नेहा शर्मा" },
  {
    label: "जन्म तिथि",
    value: "",
    placeholder: "24 दिसंबर 1995 10:10 पूर्वाह्न",
  },
  { label: "ऊंचाई", value: "", placeholder: "5 फीट 2 इंच" },
  { label: "रंग", value: "", placeholder: "गोरा" },
  { label: "जाति", value: "", placeholder: "ब्राह्मण, हिंदू" },
];

const ProfessionalDataHindi = [
  { label: "कंपनी", value: "", placeholder: "TCS" },
  { label: "पद", value: "", placeholder: "सॉफ्टवेयर इंजीनियर" },
  { label: "अनुभव (वर्षों में)", value: "", placeholder: "2" },
  { label: "वेतन", value: "", placeholder: "8 LPA" },
];

const EducationDataHindi = [
  { label: "डिग्री", value: "", placeholder: "बी.टेक" },
  { label: "संस्थान", value: "", placeholder: "आर.जी.टी.यू. भोपाल (म.प्र.)" },
  { label: "साल", value: "", placeholder: "2018" },
  { label: "स्कोर", value: "", placeholder: "8.5 CGPA" },
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
    placeholder: "श्री शिव प्रसाद शर्मा",
  },
  mother: {
    label: "माता",
    value: createEmptyPersonHindi(),
    placeholder: "श्रीमती सुरभि शर्मा",
  },
  brothers: { label: "भाई", value: [] },
  sisters: { label: "बहन", value: [] },
};

const ContactDataHindi = [
  {
    label: "पता",
    value: "",
    placeholder:
      "मकान संख्या 432, रिंग रोड, योजना क्रमांक 94 सेक्टर ईबी, इंदौर, मध्य प्रदेश 452010",
  },
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
