import React, { useState, useRef, useEffect } from "react";
import "./AdminNavbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../AdminContext/AdminContex";

import {
  Dashboard,
  Description,
  Person2,
  Person,
  Logout,
} from "@mui/icons-material";
import Logo from "../../../assets/logo.png";

const adminNavLinks = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
  },
  {
    id: "production",
    label: "Production",
    path: "/admin/production",
    icon: <Description />,
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

  // Close dropdown when clicking outside
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
  };
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-inner">
        <Link to="/" className="navbar-logo">
          <img
            src={Logo}
            alt="Ditvi Biodata Logo"
            className="navbar-logo-img"
          />
          <span className="navbar-logo-shine"></span>
        </Link>

        <div className={`admin-navbar-menu ${isMobile ? "active" : ""}`}>
          <ul className="admin-navbar-list">
            {adminNavLinks
              .filter((link) => link.id !== "profile")
              .map((link) => (
                <li
                  key={link.id}
                  className={`admin-navbar-item ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                >
                  <Link to={link.path} className="admin-navbar-link">
                    <span className="admin-navbar-icon">{link.icon}</span>
                    <span className="admin-navbar-text">{link.label}</span>
                  </Link>
                </li>
              ))}
            <li
              className="admin-navbar-item profile-dropdown"
              ref={dropdownRef}
            >
              <button
                className={`admin-navbar-profile-btn ${
                  isProfileOpen ? "active" : ""
                }`}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <span className="admin-navbar-icon dropdown-icon">
                  <Person />
                </span>
              </button>
              {isProfileOpen && (
                <div className="profile-dropdown-menu">
                  <div className="profile-dropdown-header">
                    <Person2/>
                    <span className="admin-navbar-text-name">
                      {adminData?.name || "Profile"}
                    </span>
                  </div>
                  <button onClick={handleLogout} className="dropdown-item">
                    <Logout /> Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
