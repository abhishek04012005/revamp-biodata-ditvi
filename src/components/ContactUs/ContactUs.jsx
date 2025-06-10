import React, { useState } from "react";
import "./ContactUs.css";
import Container from "../../structure/Container/Container";
import HeaderSection from "../../structure/HeaderSection/HeaderSection";
import Grid from "@mui/material/Grid";
import { Box, TextField, Button } from "@mui/material";
import { Email, Phone, Person, Message } from "@mui/icons-material";
import ContactUsImg from "../../assets/contactus.svg";
import { ContactUsStorage } from "../../supabase/ContactUs";
import Loader from "../../structure/Loader/Loader";
import SEO from "../SEO/SEO";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
  });

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    if (e.target.name === "number") {
      const value = e.target.value.replace(/\D/g, "");
      if (value === "" || value.length <= 10) {
        setFormData({ ...formData, number: value });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await ContactUsStorage.saveContactUs({
        name: formData.name,
        email: formData.email,
        mobile: formData.number,
        message: formData.message,
      });

      if (response) {
        setNotification({
          show: true,
          message: "Thank You! We'll get back to you soon.",
          type: "success",
        });
        setFormData({ name: "", email: "", message: "", number: "" });
      } else {
        setNotification({
          show: true,
          message: "There was an error submitting the form.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        show: true,
        message: "There was an error submitting the form.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e) => {
    // Allow only letters and spaces, remove other characters
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  return (
    <>
      <SEO
        title="Contact Us | Get in Touch with Biodata Maker"
        description="Contact our team for any questions about our biodata creation service. We're here to help you create the perfect marriage biodata."
        keywords="contact biodata maker, biodata support, marriage biodata help, biodata service contact"
        ogImage={`${window.location.origin}/images/contact-preview.jpg`}
        // canonicalUrl={currentUrl}
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Biodata Maker",
          // "url": currentUrl,
          description: "Contact page for Biodata Maker service",
          publisher: {
            "@type": "Organization",
            name: "Biodata Maker",
            logo: {
              "@type": "ImageObject",
              url: `${window.location.origin}/logo.png`,
            },
          },
          mainEntity: {
            "@type": "Organization",
            name: "Biodata Maker",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-XXXXXXXXXX",
              contactType: "customer service",
              email: "support@your-domain.com",
              areaServed: "IN",
              availableLanguage: ["en", "hi"],
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "IN",
              addressLocality: "Your City",
              addressRegion: "Your State",
            },
          },
        }}
      />
      <div className="contact-us">
        <section className="contact">
          <div className="contact-background">
            <div className="contact-circle circle-1"></div>
            <div className="contact-circle circle-2"></div>
          </div>

          <Container>
            <HeaderSection
              title="Contact Us"
              subtitle={`We'd love to hear from you. Send us a message and we'll respond as soon as possible`}
            />

            <Grid
              container
              direction={{ xs: "column-reverse", md: "row" }}
              spacing={{ xs: 5, md: 3, lg: 20 }}
              className="contact-grid"
            >
              <Grid size={{ xs: 12, md: 6 }} className="contact-form-wrapper">
                <div className="contact-card">
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className="contact-form"
                  >
                    <div className="contact-input-wrapper">
                      <Person className="contact-input-icon" />
                      <TextField
                        className="contact-input"
                        label="Your Name"
                        name="name"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleNameChange}
                        onKeyPress={(e) => {
                          // Prevent non-alphabetic keys (except space and control keys)
                          if (!/[A-Za-z\s]/.test(e.key) && e.key.length === 1) {
                            e.preventDefault();
                          }
                        }}
                        inputProps={{
                          pattern: "[A-Za-z\\s]{3,50}",
                          title:
                            "Please enter a valid name (letters and spaces only)",
                          minLength: 3,
                          maxLength: 50,
                        }}
                        error={
                          formData.name &&
                          !/^[A-Za-z\s]{3,50}$/.test(formData.name)
                        }
                        helperText={
                          formData.name &&
                          !/^[A-Za-z\s]{3,50}$/.test(formData.name)
                            ? "Name should contain only letters and spaces (3-50 characters)"
                            : ""
                        }
                        fullWidth
                        required
                      />
                    </div>

                    <div className="contact-input-wrapper">
                      <Email className="contact-input-icon" />
                      <TextField
                        className="contact-input"
                        label="Your Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                      />
                    </div>

                    <div className="contact-input-wrapper">
                      <Phone className="contact-input-icon" />
                      <TextField
                        className="contact-input"
                        label="Whatsapp Number"
                        name="number"
                        type="tel"
                        variant="outlined"
                        value={formData.number}
                        onChange={handleChange}
                        maxLength={10}
                        minLength={10}
                        error={
                          formData.number &&
                          !formData.number.match(/^[6789]\d{9}$/)
                        }
                        helperText={
                          formData.number &&
                          !formData.number.match(/^[6789]\d{9}$/)
                            ? "Enter a valid 10-digit whatsapp number that begins with 6, 7, 8, or 9."
                            : ""
                        }
                        inputProps={{
                          maxLength: 10,
                          pattern: "[6789][0-9]*",
                          inputMode: "numeric",
                        }}
                        fullWidth
                        required
                      />
                    </div>

                    <div className="contact-input-wrapper">
                      <Message className="contact-input-icon message-icon" />
                      <TextField
                        className="contact-input"
                        label="Your Message"
                        name="message"
                        variant="outlined"
                        value={formData.message}
                        onChange={handleChange}
                        rows={0}
                        fullWidth
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      className="contact-submit-btn"
                      disabled={loading}
                    >
                      Submit
                      <div className="contact-btn-shine"></div>
                    </Button>
                  </Box>
                </div>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }} className="contact-image-wrapper">
                <div className="contact-image-card">
                  <img src={ContactUsImg} alt="Contact Us Illustration" />
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>
      </div>

      {notification.show && (
        <div
          className="notification-overlay"
          onClick={() =>
            setNotification({ show: false, message: "", type: "success" })
          }
        >
          <div
            className={`notification-popup ${notification.type}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="notification-close-btn"
              onClick={() =>
                setNotification({ show: false, message: "", type: "success" })
              }
              aria-label="Close notification"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="notification-content">
              <div className={`notification-icon-wrapper ${notification.type}`}>
                {notification.type === "success" ? (
                  <div className="notification-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" className="icon-circle" />
                      <path
                        d="M8 12l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="icon-path"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="notification-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" className="icon-circle" />
                      <path
                        d="M15 9l-6 6M9 9l6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="icon-path"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="notification-text">
                <h3 className="notification-title">
                  {notification.type === "success" ? "Thank You!" : "Oops!"}
                </h3>
                <p className="notification-message">{notification.message}</p>
              </div>
              <button
                className="notification-close-btn"
                onClick={() =>
                  setNotification({ show: false, message: "", type: "success" })
                }
                aria-label="Close notification"
              >
                <span>×</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}
    </>
  );
};

export default ContactUs;
