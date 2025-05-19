import React, { useState } from "react";
import "./AdminNavbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../AdminContext/AdminContex";

import {
  Dashboard,
  Description,
  Settings,
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
    id: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <Settings />,
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
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutAdmin, adminData } = useAdmin();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-inner">

        <div className="dashboard-admin-info">
          <span className="dashboard-admin-welcome">Welcome,</span>
          <h2 className="dashboard-admin-name">
            {adminData?.name || "No Admin"}
          </h2>
        </div>

        <div className={`admin-navbar-menu ${isMobile ? "active" : ""}`}>
          <ul className="admin-navbar-list">
            {adminNavLinks.map((link) => (
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
            <li className="admin-navbar-item">
              <button onClick={handleLogout} className="admin-navbar-logout">
                <span className="admin-navbar-icon">
                  <Logout />
                </span>
                <span className="admin-navbar-text">Logout</span>
              </button>
            </li>
          </ul>
        </div>

        <button
          className="admin-navbar-toggle"
          onClick={() => setIsMobile(!isMobile)}
          aria-label="Toggle menu"
        >
          <span
            className={`admin-navbar-hamburger ${isMobile ? "active" : ""}`}
          ></span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
