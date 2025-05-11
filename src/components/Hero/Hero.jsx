import React from 'react'
import './Hero.css'
import Container from '../../structure/Container/Container'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Biodata1111 from '../../assets/biodata/biodata-1111.png'
import { ArrowBack, ArrowForward } from '@mui/icons-material'



const NextArrow = (props) => {
    const { className, onClick } = props;
    return (

        <ArrowForward className={`${className} custom-arrow`} onClick={onClick} />
    );
};

const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (

        <ArrowBack className={`${className} custom-arrow`} onClick={onClick} />

    );
};

const Hero = () => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    };



    return (
        <>
            <div className="hero">
                <div className="hero-background">
                    <div className="animated-circle circle-1"></div>
                    <div className="animated-circle circle-2"></div>
                    <div className="animated-circle circle-3"></div>
                </div>
                <Container>
                    <div className="hero-inner">
                        <div className="hero-left">
                            <div className="hero-left-text">
                                <div className="hero-badge">
                                    <span className="badge-icon">⭐</span>
                                    Premium Biodata Service
                                </div>
                                <h1 className='hero-left-text-heading'>
                                    <span className="highlight animate-text">GET YOUR CUSTOMIZED</span> TRADITIONAL
                                    <span className="gradient-text animate-gradient"> BIO-DATA</span> FROM EXPERTS.
                                </h1>
                                <h2 className='hero-left-text-subheading'>
                                    YOUR SATISFACTION COMES FIRST, PAY US ONLY WHEN YOU'RE HAPPY.
                                </h2>
                                <div className="hero-buttons">
                                    <button className="primary-btn">
                                        Get Started
                                        <span className="btn-shine"></span>
                                    </button>
                                    <button className="secondary-btn">
                                        Learn More
                                        <span className="btn-arrow">→</span>
                                    </button>
                                </div>
                                <div className="hero-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">500+</span>
                                        <span className="stat-label">Happy Clients</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">100%</span>
                                        <span className="stat-label">Satisfaction</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="hero-right">
                            <div className="image-wrapper">
                                <img src={""} alt="Biodata Template" />
                                <div className="floating-card card-1">
                                    <span>✨ Premium Templates</span>
                                </div>
                                <div className="floating-card card-4">
                                    <span>✨ Traditional Biodata</span>
                                </div>
                                <div className="floating-card card-2">
                                    <span>🎯 100% Satisfaction</span>
                                </div>
                                <div className="floating-card card-3">
                                    <span>🚀 Quick Delivery</span>
                                </div>
                            </div>
                        </div> */}

                        <div className="hero-right">
                            <div className="image-wrapper">
                                <Slider {...settings} className="hero-carousel">
                                    <div className="carousel-slide">
                                        <img src={Biodata1111} alt="Biodata Template 1" />
                                    </div>
                                    <div className="carousel-slide">
                                        <img src="https://i.pinimg.com/474x/26/d3/63/26d3632f120fca324a6ef3139b580897.jpg" alt="Biodata Template 2" />
                                    </div>
                                    <div className="carousel-slide">
                                        <img src="https://images.unsplash.com/photo-1570481662006-a3a1374699e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVsZmlufGVufDB8fDB8fHww" alt="Biodata Template 3" />
                                    </div>
                                </Slider>
                                <div className="floating-card card-1">
                                    <span>✨ Premium Templates</span>
                                </div>
                                <div className="floating-card card-4">
                                    <span>✨ Traditional Biodata</span>
                                </div>
                                <div className="floating-card card-2">
                                    <span>🎯 100% Satisfaction</span>
                                </div>
                                <div className="floating-card card-3">
                                    <span>🚀 Quick Delivery</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            </div>
        </>
    )
}

export default Hero