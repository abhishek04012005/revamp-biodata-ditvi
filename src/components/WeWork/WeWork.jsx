import React, { useState } from "react";
import "./WeWork.css";
import { Grid } from "@mui/material";
import Container from "../../structure/Container/Container";
import HeaderSection from "../../structure/HeaderSection/HeaderSection";
import weWork from "../../json/weWork";
import SEO from "../SEO/SEO";

const WeWork = () => {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <>
      <SEO
        title="How We Work | Biodata Maker Process"
        description="Learn how our biodata creation process works. Simple steps to create your traditional marriage biodata with professional templates."
        keywords="biodata process, how to create biodata, marriage biodata steps, biodata maker process"
        ogImage="https://your-domain.com/how-we-work.jpg"
        schema={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Create Your Biodata",
          description:
            "Step by step process to create your traditional marriage biodata",
          url: "https://your-domain.com/how-we-work",
          step: weWork.map((step, index) => ({
            "@type": "HowToStep",
            position: step.number,
            name: step.title,
            itemListElement: step.steps.map((text) => ({
              "@type": "HowToDirection",
              text: text,
            })),
          })),
        }}
      />
      <section className="how-we-work">
        <div className="how-we-work-background">
          <div className="animated-circle circle-1"></div>
          <div className="animated-circle circle-2"></div>
        </div>
        <Container>
          <HeaderSection
            title="How We work"
            subtitle={`Simple steps to get your traditional biodata`}
          />

          <div className="process-timeline">
            <div className="timeline-line"></div>
            <Grid container spacing={4}>
              {weWork.map((step, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={step.number}>
                  <div
                    className={`process-step ${
                      activeStep === index ? "active" : ""
                    }`}
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div className="step-icon">
                      <span className="icon">{step.icon}</span>
                      <span className="number">{step.number}</span>
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <div className="step-content">
                      <ul>
                        {step.steps.map((text, i) => (
                          <li key={i}>{text}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </section>
    </>
  );
};

export default WeWork;
