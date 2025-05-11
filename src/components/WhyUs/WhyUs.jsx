import React, { useState } from 'react'
import './WhyUs.css'
import HeaderSection from '../../structure/HeaderSection/HeaderSection'
import Container from '../../structure/Container/Container';
import whyUsData from '../../json/whyUs';



const WhyUs = () => {
    const [activeId, setActiveId] = useState(null);


    return (
        <>
            <div className="whyus">

                <section className="whyus" id="whyus">

                    <Container>
                        <HeaderSection title="Why Us?" subtitle={`Create lasting impressions with our expertly crafted traditional biodata designs`} />
                        <div className="whyus-inner">



                            <div className="whyus-grid">
                                {whyUsData.map((item) => (
                                    <div
                                        className={`whyus-card ${activeId === item.id ? 'active' : ''}`}
                                        key={item.id}
                                        onMouseEnter={() => setActiveId(item.id)}
                                        onMouseLeave={() => setActiveId(null)}
                                        style={{
                                            '--hover-bg': item.hoverBg,
                                            '--animation-delay': item.animationDelay
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
    )
}

export default WhyUs