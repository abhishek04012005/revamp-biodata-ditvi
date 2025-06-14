import React from 'react'
import './Hero.css'
import Container from '../../structure/Container/Container'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel1 from '../../assets/hero/carousel1.png'
import Carousel2 from '../../assets/hero/carousel2.png'
import Carousel3 from '../../assets/hero/carousel3.png'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';




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
    const navigate = useNavigate();


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

     const handleGetStarted = () => {
        navigate('/biodata');
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
                                    <button className="primary-btn" onClick={handleGetStarted}>
                                        Get Started
                                        <span className="btn-shine"></span>
                                    </button>
                                    <button className="secondary-btn" onClick={() => navigate('/whyus')}>
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
                        

                        <div className="hero-right">
                            <div className="image-wrapper">
                                <Slider {...settings} className="hero-carousel">
                                    <div className="carousel-slide">
                                        <img src={Carousel1} alt="Biodata Template 1" />
                                    </div>
                                    <div className="carousel-slide">
                                        <img src={Carousel2} alt='carousel'/>
                                    </div>
                                    <div className="carousel-slide">
                                        <img src={Carousel3} alt="Biodata Template 3" />
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