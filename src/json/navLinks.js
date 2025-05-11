import {Home, Info, Work, Description, Book, ContactMail} from '@mui/icons-material';


const navLinks = [
    { id: '', label: 'HOME', icon: <Home /> },
    { id: 'biodata', label: 'BIODATA', icon: <Description /> },
    { id: 'whyus', label: 'WHY US?', icon: <Info /> },
    { id: 'how-we-work', label: 'HOW WE WORK', icon: <Work /> },
    { id: 'blog', label: 'BLOG', icon: <Book /> },
    { id: 'contact', label: 'CONTACT', icon: <ContactMail /> }
];

export default navLinks;