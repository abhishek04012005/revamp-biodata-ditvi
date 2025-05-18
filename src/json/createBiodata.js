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
    { label: 'Degree', value: '' },
    { label: 'Institution', value: '' },
    { label: 'Year', value: '' },
    { label: 'Score', value: '' }
];

const createEmptyPerson = () => ({
    name: '',
    married: '',
    occupation: ''
});

const FamilyData = {
    father: { label: 'Father', value: createEmptyPerson() },
    mother: { label: 'Mother', value: createEmptyPerson() },
    brothers: { label: 'Brother(s)', value: [] },
    sisters: { label: 'Sister(s)', value: [] }
};

const ContactData = [
    { label: 'Address', value: '' },
    { label: 'MobileNo', value: '' }
];


export {

    PersonalData, EducationData, ProfessionalData, ContactData, FamilyData, createEmptyPerson, defaultName, ICON_MAPPING,

};