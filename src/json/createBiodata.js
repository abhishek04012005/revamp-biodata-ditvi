import { Height, Palette, Person, CalendarMonth } from '@mui/icons-material';

const ICON_MAPPING = {
    "Date of Birth": <CalendarMonth className="g1111-icon" />,
    "Height": <Height className="g1111-icon" />,
    "Complexion": <Palette className="g1111-icon" />,
    "Caste": <Person className="g1111-icon" />
};

const PersonalData = [
    { label: 'Name', value: '', placeholder: 'Neha Sharma' },
    { label: 'Date of Birth', value: '', placeholder: '24/12/1994' },
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

const createEmptyPerson = () => ({
    name: '',
    married: '',
    occupation: ''
});

const FamilyData = {
    father: { label: 'Father', value: createEmptyPerson(), placeholder: 'Mr. Shubham Kumar' },
    mother: { label: 'Mother', value: createEmptyPerson(), placeholder: 'Mrs. Riya Devi' },
    brothers: { label: 'Brother(s)', value: [] },
    sisters: { label: 'Sister(s)', value: [] }
};

const ContactData = [
    { label: 'Address', value: '', placeholder: '123 Main St, City, State' },
    { label: 'MobileNo', value: '', placeholder: '9263767441' },
];


export {

    PersonalData, EducationData, ProfessionalData, ContactData, FamilyData, createEmptyPerson, ICON_MAPPING,

};
