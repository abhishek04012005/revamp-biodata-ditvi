import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './BiodataDetail.css'
import Background from '../../structure/Background/Background'
import { ArrowBack, LocalOffer, Star, Description, ShoppingCart } from '@mui/icons-material';
import Container from '../../structure/Container/Container'
import Languages from '../../json/Languages';
import ModelTypes from '../../json/ModelTypes';
import GetNow from '../../structure/GetNow/GetNow';
import biodataDetails from '../../json/biodataDetails';

const BiodataDetail = () => {
    const { modelNumber } = useParams();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(modelNumber);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(Languages.English.Code);
    const [selectedType, setSelectedType] = useState(ModelTypes.Professional.Code);
    const { state } = useLocation();
    const navigate = useNavigate();
    const { biodata } = state || {};

    if (!biodata) {
        navigate('/');
        return null;
    }

    const getCurrentImage = () => {
        return biodata?.[selectedLanguage === Languages.English.Code ?
            (selectedType === ModelTypes.Professional.Code ? 'image' : 'studentImage') :
            (selectedType === ModelTypes.Professional.Code ? 'hindiImage' : 'hindiStudentImage')
        ] || biodata?.image || '';
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        setImageLoaded(false);
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
        setImageLoaded(false);
    };

    return (
        <>
            <Background>
                <Container>
                    <div className="biodatadetail-inner">
                        <div className="biodatadetail-header">
                            <h1 className="biodatadetail-title">{biodata.title}</h1>
                            <button
                                onClick={() => navigate(-1)}
                                className="biodatadetail-back"
                            >
                                <ArrowBack />
                                <span>Back</span>
                            </button>
                        </div>

                        <div className="biodetail-content">
                            <div className="biodatadetail-image-wrapper">
                                <div className={`biodatadetail-image ${imageLoaded ? 'loaded' : ''}`}>
                                    <img
                                        src={getCurrentImage()}
                                        alt={biodata.modelName}
                                        onLoad={() => setImageLoaded(true)}
                                    />
                                    <div className="biodatadetail-tags">
                                        <span className="biodatadetail-premium">Premium</span>
                                        <span className="biodatadetail-discount">
                                            <LocalOffer />
                                            {biodata.discount}% OFF
                                        </span>
                                    </div>



                                </div>
                                <div className="biodatadetail-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="biodatadetail-star" />
                                    ))}
                                    <span className="biodatadetail-reviews">(50+ Reviews)</span>
                                </div>
                            </div>


                            <div className="biodatadetail-info">
                                <div className="biodatadetail-model">
                                    <h2>Model No: {biodata.modelName}</h2>
                                    <div className="biodatadetail-divider"></div>
                                </div>


                                <div className="biodatadetail-price">
                                    <div className="biodatadetail-price-original">
                                        <span className="price-label">Original Price:</span>
                                        <span className="price-value">₹{biodata.originalPrice}</span>
                                    </div>
                                    <div className="biodatadetail-price-final">
                                        <span className="price-label">Final Price:</span>
                                        <span className="price-value">₹{biodata.discountedPrice}</span>
                                    </div>
                                </div>

                                <div className="biodatadetail-options">

                                    <div className="options-group">
                                        <h4 className="options-title">Language:</h4>
                                        <div className="radio-group">
                                            <label className={`variant-option ${selectedLanguage === Languages.English.Code ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="language"
                                                    value={Languages.English.Code}
                                                    checked={selectedLanguage === Languages.English.Code}
                                                    onChange={() => handleLanguageChange(Languages.English.Code)}
                                                />
                                                <span className="variant-label">English</span>
                                            </label>
                                            <label className={`variant-option ${selectedLanguage === Languages.Hindi.Code ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="language"
                                                    value={Languages.Hindi.Code}
                                                    checked={selectedLanguage === Languages.Hindi.Code}
                                                    onChange={() => handleLanguageChange(Languages.Hindi.Code)}
                                                />
                                                <span className="variant-label">Hindi</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="options-group">
                                        <h4 className="options-title">Type:</h4>
                                        <div className="radio-group">
                                            <label className={`variant-option ${selectedType === ModelTypes.Professional.Code ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={ModelTypes.Professional.Code}
                                                    checked={selectedType === ModelTypes.Professional.Code}
                                                    onChange={() => handleTypeChange(ModelTypes.Professional.Code)}
                                                />
                                                <span className="variant-label">Professional</span>
                                            </label>
                                            <label className={`variant-option ${selectedType === ModelTypes.Student.Code ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={ModelTypes.Student.Code}
                                                    checked={selectedType === ModelTypes.Student.Code}
                                                    onChange={() => handleTypeChange(ModelTypes.Student.Code)}
                                                />
                                                <span className="variant-label">Student</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>



                                <button
                                    className="biodatadetail-cta"
                                    onClick={() => {
                                        setSelectedModel(modelNumber);
                                        setIsPopupOpen(true);
                                    }}
                                >
                                    <ShoppingCart />
                                    <span>Get Now</span>
                                    <div className="biodatadetail-btn-shine"></div>
                                </button>

                                <div className="biodatadetail-description">
                                    <div className="biodatadetail-description-header">
                                        <Description />
                                        <h3>Description</h3>
                                    </div>
                                    <p className="biodatadetail-description-text">
                                        {biodata.description}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </Container>
            </Background>
            <GetNow
                isOpen={isPopupOpen}
                onClose={() => {
                    setIsPopupOpen(false);
                    setSelectedModel('');
                }}
                modelNumber={selectedModel}
                language={selectedLanguage}
                type={selectedType}
            />
        </>
    )
}

export default BiodataDetail