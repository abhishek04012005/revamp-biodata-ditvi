import React, { useState } from "react";
import "./WhyUs.css";
import HeaderSection from "../../structure/HeaderSection/HeaderSection";
import Container from "../../structure/Container/Container";
import whyUsData from "../../json/whyUs";
import { useLocation } from "react-router-dom";
import SEO from "../SEO/SEO";

const WhyUs = () => {
  const [activeId, setActiveId] = useState(null);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <SEO
          title="Why Choose Our Biodata Maker | Professional Biodata Creation Service"
          description="Discover why our biodata maker service stands out. Professional templates, expert design, and personalized service for creating traditional marriage biodata."
          keywords="biodata maker, professional biodata service, marriage biodata creator, traditional biodata design, biodata templates, custom biodata service"
          ogImage="https://your-domain.com/images/why-choose-us.jpg"
          schema={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Professional Biodata Creation Service",
            description:
              "Expert biodata creation service for traditional marriage proposals",
            provider: {
              "@type": "Organization",
              name: "Biodata Maker",
              description: "Professional biodata creation service",
            },
            serviceType: "Biodata Creation",
            offers: {
              "@type": "Offer",
              description:
                "Professional biodata creation with customizable templates",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Biodata Services",
              itemListElement: whyUsData.map((item) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: item.title,
                  description: item.description,
                },
              })),
            },
          }}
        />
      )}
      <div className="whyus">
        <section className="whyus" id="whyus">
          <Container>
            <HeaderSection
              title="Why Us?"
              subtitle={`Create lasting impressions with our expertly crafted traditional biodata designs`}
            />

            <div className="whyus-inner">
              <div className="whyus-grid">
                {whyUsData.map((item) => (
                  <div
                    className={`whyus-card ${
                      activeId === item.id ? "active" : ""
                    }`}
                    key={item.id}
                    onMouseEnter={() => setActiveId(item.id)}
                    onMouseLeave={() => setActiveId(null)}
                    style={{
                      "--hover-bg": item.hoverBg,
                      "--animation-delay": item.animationDelay,
                    }}
                  >
                    <div className="card-icon">
                      <span>{item.icon}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="card-overlay"></div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default WhyUs;
