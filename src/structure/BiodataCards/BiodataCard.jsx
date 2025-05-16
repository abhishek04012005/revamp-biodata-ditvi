import React, { useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Container from '../Container/Container';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, ArrowBack, Star, Visibility, ShoppingCart } from '@mui/icons-material';
import HeaderSection from '../HeaderSection/HeaderSection';
import './BiodataCard.css';
import GetNow from '../GetNow/GetNow';



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


const BioDataCardStructure = ({ data, isHovered, onHover, onLeave, onGetNow, onPreview }) => (
    <>
        <div
            className={`biodata-card ${isHovered ? 'biodata-card-hovered' : ''}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <div className="biodata-card-inner">
                <div className="biodata-card-media">
                    <img src={data.image} alt={data.title} loading="lazy" />
                    <div className="biodata-card-premium">Premium</div>
                    <div className="biodata-card-discount">
                        <span className="biodata-discount-value">{data.discount}%</span>
                        <span className="biodata-discount-label">OFF</span>
                    </div>
                    <div className="biodata-card-overlay">
                        <div className="biodata-overlay-content">
                            <span className="biodata-model-label">Model No.</span>
                            <h3 className="biodata-model-name">{data.modelNumber}</h3>
                            <div className="biodata-rating">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="biodata-star" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="biodata-card-content">
                    <h3 className="biodata-content-title">{data.title}</h3>

                    <div className="biodata-price-section">
                        <div className="biodata-price-wrapper">
                            <span className="biodata-price-original">₹{data.originalPrice}</span>
                            <span className="biodata-price-final">₹{data.discountedPrice}</span>
                        </div>
                    </div>

                    <div className="biodata-buttons">
                        <button className="biodata-btn-primary" onClick={onGetNow}>
                            <ShoppingCart />
                            <span>Get Now</span>
                            <div className="biodata-btn-shine"></div>
                        </button>
                        <button className="biodata-btn-secondary" onClick={onPreview}>
                            <Visibility />
                            <span>Preview</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
);


const BiodataCard = ({ title, biodataDetails, subtitle, isSlider = true }) => {

    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Changed from 3 to 4
        slidesToScroll: 1, // Keep 1 to show next card one by one
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        centerMode: false, // Changed to false for better alignment
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '30px',
                }
            }
        ]
    };

    const renderCards = () => {
        if (isSlider) {
            return (
                <div className="cards-slider">
                    <Slider {...settings}>
                        {biodataDetails.map((biodata) => (
                            <div className="slider-item" key={biodata.id}>
                                <BioDataCardStructure
                                    data={biodata}
                                    isHovered={hoveredCard === biodata.id}
                                    onHover={() => setHoveredCard(biodata.id)}
                                    onLeave={() => setHoveredCard(null)}
                                    onGetNow={() => {
                                        setSelectedModel(biodata.modelNumber);
                                        setIsPopupOpen(true);
                                    }}
                                    onPreview={() => navigate(`/biodata/${biodata.modelNumber}`, {
                                        state: { biodata }
                                    })}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            );
        }

        return (
            <div className="cards-grid">
                {biodataDetails.map((biodata) => (
                    <BioDataCardStructure
                        key={biodata.id}
                        data={biodata}
                        isHovered={hoveredCard === biodata.id}
                        onHover={() => setHoveredCard(biodata.id)}
                        onLeave={() => setHoveredCard(null)}
                        onGetNow={() => {
                            setSelectedModel(biodata.modelNumber);
                            setIsPopupOpen(true);
                        }}
                        onPreview={() => navigate(`/biodata/${biodata.modelNumber}`, {
                            state: { biodata }
                        })}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <section className="biodata-cards">
                <div className="animated-circle circle-1"></div>
                <div className="animated-circle circle-2"></div>
                <Container>
                    <HeaderSection title={title} subtitle={subtitle} />
                    {renderCards()}
                    {isSlider && (
                        <div className="biodata-more">
                            <button
                                className="biodata-more-btn"
                                onClick={() => navigate(`/${title.toLowerCase().replace(/\s+/g, '-')}`)}
                            >
                                <span>View More</span>
                                <ArrowForward />
                            </button>
                        </div>
                    )}
                </Container>
            </section>
            <GetNow
                isOpen={isPopupOpen}
                onClose={() => {
                    setIsPopupOpen(false);
                    setSelectedModel('');
                }}
                modelNumber={selectedModel}
                language={biodataDetails.find(biodata => biodata.modelNumber === selectedModel)?.language}
                type={biodataDetails.find(biodata => biodata.modelNumber === selectedModel)?.type}
            />
        </>
    );
};
export default BiodataCard


