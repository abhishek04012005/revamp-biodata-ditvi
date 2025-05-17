import { Height, Palette, Person, CalendarMonth } from '@mui/icons-material';

const defaultName = {
    label: "Name",
    value: "Ayush Kumar"
};




const ICON_MAPPING = {
    "Date of Birth": <CalendarMonth className="g1111-icon" />,
    "Height": <Height className="g1111-icon" />,
    "Complexion": <Palette className="g1111-icon" />,
    "Caste": <Person className="g1111-icon" />
};

const PersonalData = [
    { label: 'Date of Birth', value: '' },
    { label: 'Height', value: '' },
    { label: 'Complexion', value: '' },
    { label: 'Caste', value: '' }
];

const ProfessionalData = [
    { label: 'Company', value: '' },
    { label: 'Position', value: '' },
    { label: 'Experience (in years)', value: '' },
    { label: 'Salary', value: '' }
];

const EducationData = [
    [
        { label: 'Degree', value: '' },
    { label: 'Institution', value: '' },
    { label: 'Year', value: '' },
    { label: 'Score', value: '' }
]
    
];


const familyData = [
    {
        relation: "Father",
        name: ["Mr. Suraj Kumar"],
        married: ["-"],
        occupation: ["Business"]
    },
    {
        relation: "Mother",
        name: ["Mrs. Surbhi Kumari"],
        married: ["-"],
        occupation: ["Homemaker"]
    },
    {
        relation: "Brother(s)",
        name: ["Mr. Vishal Kumar", "Mr. Vaibhav Kumar"],
        married: ["Yes", "No"],
        occupation: ["Businessman", "Software Engineer"]
    },
    {
        relation: "Sister(s)",
        name: ["Mrs. Komal Kumari", "Ms. Mehak Kumari"],
        married: ["Yes", "No"],
        occupation: ["Housewife", "Studying"]
    }
];

const contactData = {
    address: "H.No. 521, Vijay Nagar Square, Indore, \nMadhya Pradesh-402310",
    mobile: "+91 9263767441"
};


export {

    PersonalData, EducationData, ProfessionalData, contactData, familyData, defaultName, ICON_MAPPING

};