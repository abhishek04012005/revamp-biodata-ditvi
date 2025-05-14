import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetNow.css'

const GetNow = ({ isOpen, onClose, modelNumber }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add form submission logic here
            console.log('Form submitted:', { ...formData, modelNumber });

            // Reset form data
            setFormData({
                name: '',
                whatsapp: ''
            });

            // Close the modal
            onClose();

            // Navigate to check-option route
            navigate('/choose-option', {
                state: {
                    modelNumber,
                    userData: formData
                }
            });

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="getnow-overlay" onClick={handleOverlayClick}>
            <div className="getnow-content" onClick={e => e.stopPropagation()}>
                <button
                    type="button"
                    className="getnow-close-button"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="getnow-header">
                    <h2>Request Biodata</h2>
                    <p>Please fill these details.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="getnow-form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            minLength={3}
                            maxLength={50}
                        />
                    </div>
                    <div className="getnow-form-group">
                        <label htmlFor="whatsapp">WhatsApp Number:</label>
                        <input
                            id="whatsapp"
                            type="tel"
                            name="whatsapp"
                            placeholder="Enter your WhatsApp number"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit phone number"
                            required
                        />
                    </div>

                    <button type="submit" className="getnow-submit-button">
                        Save & Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GetNow;