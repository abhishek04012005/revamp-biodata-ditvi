import React from "react";
import "./Footer.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import socialLinks from "../../json/socialMedia";
import { footerQuickLinks, contactInfo } from "../../json/footer";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleLinkClick = (id, path) => {
    // Special handling for articles

  

    if (isHomePage && id !== "article") {
      // Handle smooth scroll on homepage
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to other pages
      navigate(path);
    }
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-background">
          <div className="footer-circle circle-1"></div>
          <div className="footer-circle circle-2"></div>
        </div>
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <img src={Logo} alt="Ditvi Biodata Logo" />
              </Link>
              <p className="footer-description">
                Creating lasting impressions with our expertly crafted
                traditional biodata designs.
              </p>
              <div className="footer-social">
                {socialLinks.map(({ id, icon, url, className }) => (
                  <a
                    key={id}
                    href={url}
                    className={`footer-social-link ${className}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h3 className="footer-title">Quick Links</h3>
                <ul className="footer-list">
                  {footerQuickLinks.map(({ id, label, path }) => (
                    <li key={id}>
                      <Link
                        to={path}
                        className="footer-link"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(id, path);
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-section">
                <h3 className="footer-title">Contact Info</h3>
                <ul className="footer-list">
                  {contactInfo.map(({ id, icon, content, href, isText }) => (
                    <li key={id} className="footer-contact-item">
                      {icon}
                      {isText ? (
                        <span className="footer-text">{content}</span>
                      ) : (
                        <a href={href} className="footer-link">
                          {content}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>
                Ditvi Biodata is a unit of <strong>Ditvi Foundation</strong> | ©{" "}
                {new Date().getFullYear()} Ditvi Biodata. All rights reserved.
              </p>
            </div>
            <div className="footer-legal">
              <Link to="/privacy" className="footer-legal-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="footer-legal-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
