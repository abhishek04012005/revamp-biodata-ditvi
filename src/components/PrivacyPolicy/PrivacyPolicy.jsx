import React from "react";
import Container from "../../structure/Container/Container";
import "./PrivacyPolicy.css";
import SEO from "../SEO/SEO";

const PrivacyPolicy = () => {
  const seoData = {
    title: "Privacy Policy | Ditvi Biodata - Secure Biodata Creation Service",
    description:
      "Learn about how Ditvi Biodata protects your personal information and ensures secure biodata creation. Read our comprehensive privacy policy and data protection measures.",
    keywords:
      "privacy policy, data protection, personal information security, Ditvi Biodata privacy, biodata security, user data rights",
    ogImage: "/images/privacy-policy-og.jpg", // Add your OG image
    canonicalUrl: "https://biodata.ditvi.org/privacy-policy", // Update with your domain
    schema: {
      "@context": "https://schema.org",
      "@type": "PrivacyPolicy",
      name: "Ditvi Biodata Privacy Policy",
      version: "1.0",
      dateModified: "2025-04-27",
      publisher: {
        "@type": "Organization",
        name: "Ditvi Biodata",
        logo: {
          "@type": "ImageObject",
          url: "/images/logo.png", // Add your logo path
        },
      },
      hasDigitalDocumentPermission: {
        "@type": "DigitalDocumentPermission",
        permissionType: "http://schema.org/ReadPermission",
        grantee: {
          "@type": "Audience",
          audienceType: "public",
        },
      },
      mainEntity: {
        "@type": "WebPage",
        name: "Privacy Policy",
        description:
          "Ditvi Biodata's privacy policy and data protection measures",
        significantLink: [
          {
            "@type": "WebPage",
            name: "Data Protection",
            url: "https://biodata.ditvi.org/privacy-policy#data-protection",
          },
          {
            "@type": "WebPage",
            name: "Your Rights",
            url: "https://biodata.ditvi.org/privacy-policy#your-rights",
          },
        ],
      },
    },
  };

  return (
    <>
      <SEO {...seoData} />

      <section className="privacy-policy">
        <div className="privacy-background">
          <div className="privacy-circle circle-1"></div>
          <div className="privacy-circle circle-2"></div>
        </div>

        <Container>
          <div className="privacy-wrapper">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-last-updated">Last Updated: April 27, 2025</p>

            <div className="privacy-content">
              <section className="privacy-section">
                <h2>Introduction</h2>
                <p>
                  At Ditvi Biodata, we value your privacy and are committed to
                  protecting your personal information. This Privacy Policy
                  explains how we collect, use, and safeguard your data when you
                  use our biodata creation services.
                </p>
              </section>

              <section className="privacy-section">
                <h2>Information We Collect</h2>
                <h3>Personal Information</h3>
                <ul>
                  <li>Name and contact information</li>
                  <li>Date of birth and gender</li>
                  <li>Educational and professional details</li>
                  <li>Family background information</li>
                  <li>Photos you choose to share</li>
                  <li>Contact preferences</li>
                </ul>
              </section>

              <section className="privacy-section">
                <h2>How We Use Your Information</h2>
                <ul>
                  <li>Create and customize your biodata</li>
                  <li>Process your orders and payments</li>
                  <li>Communicate with you about our services</li>
                  <li>Improve our products and user experience</li>
                  <li>Send important updates and notifications</li>
                </ul>
              </section>

              <section className="privacy-section">
                <h2>Data Protection</h2>
                <p>
                  We implement industry-standard security measures to protect
                  your personal information from unauthorized access,
                  disclosure, or misuse. Your data is stored securely and
                  accessed only by authorized personnel.
                </p>
              </section>

              <section className="privacy-section">
                <h2>Information Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to
                  third parties. Your information is used solely for creating
                  and delivering your biodata services.
                </p>
              </section>

              <section className="privacy-section">
                <h2>Your Rights</h2>
                <ul>
                  <li>Access your personal information</li>
                  <li>Request corrections to your data</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </section>

              <section className="privacy-section">
                <h2>Contact Us</h2>
                <p>
                  If you have questions about our Privacy Policy or your
                  personal data, please contact us:
                </p>
                <div className="privacy-contact">
                  <p>Email: care@ditvi.org</p>
                  <p>Phone: +91 9263767441</p>
                  <p>Address: Thane, Maharashtra, India</p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PrivacyPolicy;
