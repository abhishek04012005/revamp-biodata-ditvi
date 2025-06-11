import React, { useState, useRef, useEffect } from "react";
import "./AdminNavbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../AdminContext/AdminContex";
import {
  ContactPage, Description, Person2, Person,
  Logout, Payment, Dashboard, Feedback, AddIcCall,
  Menu as MenuIcon, Close
} from "@mui/icons-material";
import Logo from "../../../assets/logo.png";


const adminNavLinks = [
  {
    id: "lead-dashboard",
    label: "Lead",
    path: "/admin/lead-dashboard",
    icon: <AddIcCall />,
  },
  {
    id: "contact-dashboard",
    label: "Contact",
    path: "/admin/contact-dashboard",
    icon: <ContactPage />,
  },
  {
    id: "feedback-dashboard",
    label: "Feedback",
    path: "/admin/feedback-dashboard",
    icon: <Feedback />,
  },
  {
    id: "payment-dashboard",
    label: "Payment",
    path: "/admin/payment-dashboard",
    icon: <Payment />,
  },
  {
    id: "production-dashboard",
    label: "Production",
    path: "/admin/production-dashboard",
    icon: <Description />,
  },
  {
    id: "biodata-dashboard",
    label: "Biodata",
    path: "/admin/biodata-dashboard",
    icon: <Dashboard />,
  },
  {
    id: "profile",
    label: "Profile",
    path: "/admin/profile",
    icon: <Person />,
  },
];

const AdminNavbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutAdmin, adminData } = useAdmin();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
    setIsProfileOpen(false);
    setIsMobile(false);
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-background"></div>
      <div className="admin-navbar-container">
        <Link to="/admin" className="admin-navbar-logo">
          <img src={Logo} alt="Ditvi Admin" />
          <div className="logo-shine"></div>
        </Link>

        <button 
          className="admin-navbar-toggle"
          onClick={() => setIsMobile(!isMobile)}
          aria-label="Toggle menu"
        >
          {isMobile ? <Close /> : <MenuIcon />}
        </button>

        <div className={`admin-navbar-content ${isMobile ? 'show' : ''}`}>
          <ul className="admin-navbar-list">
            {adminNavLinks
              .filter(link => link.id !== 'profile')
              .map(link => (
                <li 
                  key={link.id}
                  className={`admin-navbar-item ${
                    location.pathname === link.path ? 'active' : ''
                  }`}
                >
                  <Link 
                    to={link.path}
                    className="admin-navbar-link"
                    onClick={() => setIsMobile(false)}
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.label}</span>
                    <span className="link-highlight"></span>
                  </Link>
                </li>
              ))}
          </ul>

          <div className="admin-navbar-profile" ref={dropdownRef}>
            <button
              className={`profile-button ${isProfileOpen ? 'active' : ''}`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <Person className="profile-icon" />
              <span className="profile-text">
                {adminData?.name || 'Admin'}
              </span>
            </button>

            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <Person2 />
                  <span>{adminData?.name || 'Admin'}</span>
                </div>
                <button onClick={handleLogout} className="dropdown-item">
                  <Logout />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;