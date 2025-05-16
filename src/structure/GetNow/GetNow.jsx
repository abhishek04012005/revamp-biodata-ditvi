import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetNow.css'
import { UserDetailsStorage } from '../../db/userDetails';

const GetNow=({ isOpen, onClose, modelNumber, language, type }) => {

    const navigate = useNavigate();

    console.log('GetNow component rendered with modelNumber:', modelNumber);
    console.log('GetNow component rendered with language:', language);
    console.log('GetNow component rendered with type:', type);
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
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
            const userDetail = await UserDetailsStorage.saveUserDetails({
                ...formData,
                modelNumber: modelNumber,
                language: language,
                type: type,
            });
            console.log('Form submitted:', { ...formData, modelNumber });

            // Reset form data
            setFormData({
                name: '',
                mobileNumber: ''
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
                            id="mobileNumber"
                            type="tel"
                            name="mobileNumber"
                            placeholder="Enter your WhatsApp number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            maxLength={10}
                            minLength={10}
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