import React from 'react';
import './AdminFooter.css';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.png';

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-content">
        <Link to="/admin/dashboard" className="admin-footer-logo">
          <img src={Logo} alt="Ditvi Biodata Admin" />
        </Link>
        <div className="admin-footer-copyright">
          <p>© {new Date().getFullYear()} Ditvi Biodata Admin Panel | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;