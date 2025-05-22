import { Height, Palette, Person, CalendarMonth } from '@mui/icons-material';

const ICON_MAPPING = {
    "Date of Birth": <CalendarMonth className="g1111-icon" />,
    "Height": <Height className="g1111-icon" />,
    "Complexion": <Palette className="g1111-icon" />,
    "Caste": <Person className="g1111-icon" />
};

const PersonalData = [
    { label: 'Name', value: '', placeholder: 'Neha Sharma' },
    { label: 'Date of Birth', value: '', placeholder: '24th Dec 1994, 10:10 AM' },
    { label: 'Height', value: '', placeholder: '5 ft 2 in' },
    { label: 'Complexion', value: '', placeholder: 'Fair' },
    { label: 'Caste', value: '', placeholder: 'Brahmin, Hindu' },
];

const ProfessionalData = [
    { label: 'Company', value: '', placeholder: 'TCS' },
    { label: 'Position', value: '', placeholder: 'Software Engineer' },
    { label: 'Experience (in years)', value: '', placeholder: '2' },
    { label: 'Salary', value: '', placeholder: '8 LPA' },
];

const EducationData = [
    { label: 'Degree', value: '', placeholder: 'B.Tech' },
    { label: 'Institution', value: '', placeholder: 'IIT Delhi' },
    { label: 'Year', value: '', placeholder: '2020' },
    { label: 'Score', value: '', placeholder: '8.5 CGPA' },
];

const ExaminationData = [
    { label: 'Examination Preparing For', value: '', placeholder: 'UPCS' },
    { label: 'Examination Qualified', value: '', placeholder: `UPSC-${new Date().getFullYear() - 1} (Pre)` }
];

const createEmptyPerson = () => ({
    name: '',
    married: 'No',
    occupation: ''
});

const FamilyData = {
    father: { label: 'Father', value: createEmptyPerson(), placeholder: 'Mr. Shiv Prasad Sharma' },
    mother: { label: 'Mother', value: createEmptyPerson(), placeholder: 'Mrs. Surbhi Sharma' },
    brothers: { label: 'Brother(s)', value: [] },
    sisters: { label: 'Sister(s)', value: [] }
};

const ContactData = [
    { label: 'Address', value: '', placeholder: '123 Main St, City, State' },
    { label: 'MobileNo', value: '', placeholder: '9263767441' },
];


export {
    PersonalData, EducationData, ExaminationData, ProfessionalData, ContactData, FamilyData, createEmptyPerson, ICON_MAPPING,
};
