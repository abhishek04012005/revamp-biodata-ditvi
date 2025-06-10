import React from "react";
import "./TermsOfService.css";
import Container from "../../structure/Container/Container";
import SEO from "../SEO/SEO";

const TermsOfService = () => {
  const seoData = {
    title: "Terms of Service | Ditvi Biodata - Marriage Biodata Creation",
    description:
      "Read our Terms of Service for using Ditvi Biodata's marriage biodata creation services. Learn about our delivery, refund, and payment policies for professional biodata creation.",
    keywords:
      "terms of service, Ditvi Biodata terms, biodata service terms, refund policy, delivery policy, payment terms, service agreement",
    ogImage: "/images/terms-of-service-og.jpg",
    canonicalUrl: "https://biodata.ditvi.org/terms-of-service",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Ditvi Biodata Terms of Service",
      lastReviewed: "2025-04-27",
      publisher: {
        "@type": "Organization",
        name: "Ditvi Biodata",
        logo: {
          "@type": "ImageObject",
          url: "/images/logo.png",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9263767441",
          contactType: "customer service",
          email: "care@ditvi.org",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      },
      mainEntity: {
        "@type": "TermsOfService",
        name: "Ditvi Biodata Service Terms",
        dateModified: "2025-04-27",
        offers: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Marriage Biodata Creation",
            description:
              "Professional biodata creation service with multiple delivery options",
          },
        },
        termsOfService: {
          "@type": "DigitalDocument",
          name: "Terms of Service",
          hasPart: [
            {
              "@type": "WebPageElement",
              name: "Acceptance of Terms",
              position: 1,
            },
            {
              "@type": "WebPageElement",
              name: "Service Description",
              position: 2,
            },
            {
              "@type": "WebPageElement",
              name: "Payment Terms",
              position: 3,
            },
            {
              "@type": "WebPageElement",
              name: "Delivery Policy",
              position: 4,
            },
            {
              "@type": "WebPageElement",
              name: "Refund Policy",
              position: 5,
            },
          ],
        },
      },
    },
  };
  return (
    <>
      <SEO {...seoData} />
      <section className="terms">
        <div className="terms-background">
          <div className="terms-circle circle-1"></div>
          <div className="terms-circle circle-2"></div>
        </div>

        <Container>
          <div className="terms-wrapper">
            <h1 className="terms-title">Terms of Service</h1>
            <p className="terms-last-updated">Last Updated: April 27, 2025</p>

            <div className="terms-content">
              <section className="terms-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Ditvi Biodata services, you agree to be
                  bound by these Terms of Service. If you do not agree to these
                  terms, please do not use our services.
                </p>
              </section>

              <section className="terms-section">
                <h2>2. Service Description</h2>
                <p>
                  Ditvi Biodata provides traditional biodata creation services.
                  Our services include:
                </p>
                <ul>
                  <li>Custom biodata design and formatting</li>
                  <li>Digital delivery of completed biodatas</li>
                  <li>Revisions as per agreed terms</li>
                  <li>Customer support during business hours</li>
                </ul>
              </section>

              <section className="terms-section">
                <h2>3. Payment Terms</h2>
                <ul>
                  <li>
                    Payment is required after approval of the watermarked
                    preview
                  </li>
                  <li>All prices are in Indian Rupees (INR)</li>
                  <li>
                    Payment methods: UPI, Net Banking, and other available
                    options
                  </li>
                  <li>Prices are subject to change without prior notice</li>
                </ul>
              </section>

              <section className="terms-section">
                <h2>4. Delivery Policy</h2>
                <ul>
                  <li>Digital delivery within 24-48 hours after payment</li>
                  <li>Revisions within 7 days of delivery</li>
                  <li>Final files provided in PDF format</li>
                  <li>Express delivery available on request</li>
                </ul>
              </section>

              <section className="terms-section">
                <h2>5. Refund Policy</h2>
                <p>We offer refunds under the following conditions:</p>
                <ul>
                  <li>Service not delivered within promised timeframe</li>
                  <li>Technical issues preventing delivery</li>
                  <li>Inability to provide the service as advertised</li>
                </ul>
              </section>

              <section className="terms-section">
                <h2>6. User Responsibilities</h2>
                <ul>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain confidentiality of account details</li>
                  <li>Use services in compliance with applicable laws</li>
                  <li>Not misuse or attempt to manipulate our services</li>
                </ul>
              </section>

              <section className="terms-section">
                <h2>7. Intellectual Property</h2>
                <p>
                  All designs, templates, and content provided by Ditvi Biodata
                  remain our intellectual property. Users receive a
                  non-exclusive license to use the delivered biodata for
                  personal purposes.
                </p>
              </section>

              <section className="terms-section">
                <h2>8. Limitation of Liability</h2>
                <p>Ditvi Biodata is not liable for:</p>
                <ul>
                  <li>Accuracy of information provided by users</li>
                  <li>Misuse of delivered biodatas</li>
                  <li>Third-party claims or damages</li>
                  <li>Indirect or consequential losses</li>
                </ul>
              </section>

              <section className="terms-section">
                <h2>9. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="terms-contact">
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

export default TermsOfService;
