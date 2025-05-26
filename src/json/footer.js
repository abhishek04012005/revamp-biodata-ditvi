import { Phone, Email, LocationOn } from "@mui/icons-material";

const footerQuickLinks = [
  { id: "hero", label: "Home", path: "/" },
  { id: "whyus", label: "Why Us", path: "/whyus" },
  { id: "how-we-work", label: "How We Work", path: "/how-we-work" },
  { id: "biodata", label: "Biodata", path: "/biodata" },
  { id: "blog", label: "Blog", path: "/blog" },
];

const contactInfo = [
  {
    id: "phone",
    icon: <Phone className="footer-icon" />,
    content: "+91 9263767441",
    href: "tel:+919263767441",
  },
  {
    id: "email",
    icon: <Email className="footer-icon" />,
    content: "care@ditvi.org",
    href: "mailto:care@ditvi.org",
  },
  {
    id: "location",
    icon: <LocationOn className="footer-icon" />,
    content: "Thane, Maharashtra, India",
    isText: true,
  },
];

export { footerQuickLinks, contactInfo };
