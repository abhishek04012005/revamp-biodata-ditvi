import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, WhatsApp, TrackChanges, Style, Language, Category, Badge, ConfirmationNumber } from '@mui/icons-material';
import './RequestConfirmation.css';
import Container from '../../../structure/Container/Container';

const RequestConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        userName,
        requestNumber,
        modelNumber,
        language,
        type
    } = location.state || {
        userName: 'User',
        requestNumber: 'DTV' + Math.floor(Math.random() * 10000),
        modelNumber: 'MD001',
        language: 'English',
        type: 'Standard'
    };

    return (
        <section className="confirmation-page">
            <Container>
                <div className="confirmation-content">
                    <div className="confirmation-card">
                        <div className="success-icon-wrapper">
                            <Check className="success-icon" />
                        </div>

                        <h1>Thank You!</h1>
                        <p className="success-message">
                            Your biodata has been successfully uploaded.
                        </p>

                        <div className="confirmation-details">
                            <div className="detail-item">
                                <span className="detail-label">
                                    <span className="detail-icon-wrapper">
                                        <ConfirmationNumber className="detail-icon" />
                                        Request Number
                                    </span>
                                </span>
                                <span className="detail-value highlight">{requestNumber}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">
                                    <span className="detail-icon-wrapper">
                                        <Badge className="detail-icon" />
                                        Name
                                    </span>
                                </span>
                                <span className="detail-value">{userName}</span>
                            </div>



                            <div className="detail-item">
                                <span className="detail-label">
                                    <span className="detail-icon-wrapper">
                                        <Style className="detail-icon" />
                                        Model Number
                                    </span>
                                </span>
                                <span className="detail-value">{modelNumber}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">
                                    <span className="detail-icon-wrapper">
                                        <Category className="detail-icon" />
                                        Type
                                    </span>
                                </span>
                                <span className="detail-value">{type}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">
                                    <span className="detail-icon-wrapper">
                                        <Language className="detail-icon" />
                                        Language
                                    </span>
                                </span>
                                <span className="detail-value">{language}</span>
                            </div>
                        </div>

                        <div className="confirmation-actions">
                            <button
                                className="action-button track-status"
                                onClick={() => navigate(`/track-status/${requestNumber}`)}
                            >
                                <TrackChanges />
                                Track Status
                            </button>
                            <button
                                className="action-button connect"
                                onClick={() => window.open('https://wa.me/YOUR_WHATSAPP_NUMBER', '_blank')}
                            >
                                <WhatsApp />
                                Connect with Us
                            </button>

                        </div>

                        <div className="additional-info">
                            <p>Save your request number for future reference</p>
                            <p className="contact-info">
                                For any queries, contact us on WhatsApp
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default RequestConfirmation;