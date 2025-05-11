import React, { useState } from 'react'
import './WeWork.css'
import { Grid } from '@mui/material'
import Container from '../../structure/Container/Container'
import HeaderSection from '../../structure/HeaderSection/HeaderSection'
import weWork from '../../json/weWork'


const WeWork = () => {
    const [activeStep, setActiveStep] = useState(null);

    return (
        <section className="how-we-work">
            <div className="how-we-work-background">
                <div className="animated-circle circle-1"></div>
                <div className="animated-circle circle-2"></div>
            </div>
            <Container>
                <HeaderSection title="How We work" subtitle={`Simple steps to get your traditional biodata`} />
               

                <div className="process-timeline">
                    <div className="timeline-line"></div>
                    <Grid container spacing={4}>
                        {weWork.map((step, index) => (
                            <Grid size={{ xs: 12, md: 4 }} key={step.number}>
                                <div
                                    className={`process-step ${activeStep === index ? 'active' : ''}`}
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
    )
}

export default WeWork