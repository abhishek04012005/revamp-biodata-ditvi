import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    AccountCircle, Work, School, People, 
    ContactPhone, Preview, Image, 
    ArrowForward, ArrowBack, CloudUpload 
} from '@mui/icons-material';
import './CreateBiodata.css';
import Container from '../../structure/Container/Container';

const CreateBiodata = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        photo: null,
        personal: {
            fullName: '',
            dob: '',
            gender: '',
            maritalStatus: '',
            religion: '',
            caste: '',
            height: '',
            weight: '',
            bloodGroup: '',
            motherTongue: ''
        },
        professional: {
            company: '',
            position: '',
            experience: '',
            salary: ''
        },
        education: [{
            degree: '',
            institution: '',
            year: '',
            score: ''
        }],
        family: {
            father: { name: '', occupation: '' },
            mother: { name: '', occupation: '' },
            siblings: []
        },
        contact: {
            address: '',
            mobile: '',
            email: ''
        }
    });

    const steps = [
        {
            id: 1,
            title: 'Upload Photo',
            icon: <Image />,
            description: 'Add your profile photo'
        },
        {
            id: 2,
            title: 'Personal Details',
            icon: <AccountCircle />,
            description: 'Fill your personal information'
        },
        {
            id: 3,
            title: 'Professional Info',
            icon: <Work />,
            description: 'Add your work details'
        },
        {
            id: 4,
            title: 'Education',
            icon: <School />,
            description: 'Your educational background'
        },
        {
            id: 5,
            title: 'Family Details',
            icon: <People />,
            description: 'Information about your family'
        },
        {
            id: 6,
            title: 'Contact Info',
            icon: <ContactPhone />,
            description: 'Your contact details'
        },
        {
            id: 7,
            title: 'Preview',
            icon: <Preview />,
            description: 'Review your biodata'
        }
    ];

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    photo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleNext = () => {
        if (validateCurrentStep()) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length));
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo(0, 0);
    };

    const validateCurrentStep = () => {
        // Add validation logic for each step
        return true;
    };

    const handleSubmit = async () => {
        if (validateCurrentStep()) {
            setLoading(true);
            try {
                // Add your submission logic here
                console.log('Form Data:', formData);
                
                // Navigate to confirmation page
                navigate('/confirmation', { 
                    state: { 
                        userName: formData.personal.fullName,
                        requestNumber: 'BD' + Date.now()
                    } 
                });
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Failed to submit form');
            } finally {
                setLoading(false);
            }
        }
    };

    // Render the current step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="upload-step">
                        <input
                            type="file"
                            id="photo-upload"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            style={{ display: 'none' }}
                        />
                        <div className="upload-area">
                            {formData.photo ? (
                                <div className="photo-preview">
                                    <img src={formData.photo} alt="Preview" />
                                    <button onClick={() => setFormData(prev => ({ ...prev, photo: null }))}>
                                        Change Photo
                                    </button>
                                </div>
                            ) : (
                                <label htmlFor="photo-upload" className="upload-label">
                                    <CloudUpload className="upload-icon" />
                                    <span>Click to upload photo</span>
                                </label>
                            )}
                        </div>
                    </div>
                );
            // ... Add other cases for remaining steps
        }
    };

    return (
        <section className="create-biodata">
            <Container>
                <div className="create-biodata-content">
                    <div className="stepper-header">
                        <h1>Create Your Biodata</h1>
                        <p>Complete all steps to create your perfect biodata</p>
                    </div>

                    <div className="stepper-progress">
                        {steps.map((step, index) => (
                            <div 
                                key={step.id}
                                className={`step ${currentStep === step.id ? 'active' : ''} 
                                    ${currentStep > step.id ? 'completed' : ''}`}
                            >
                                <div className="step-icon-wrapper">
                                    {step.icon}
                                </div>
                                <div className="step-content">
                                    <span className="step-number">Step {step.id}</span>
                                    <span className="step-title">{step.title}</span>
                                </div>
                                {index < steps.length - 1 && <div className="step-connector" />}
                            </div>
                        ))}
                    </div>

                    <div className="step-content-wrapper">
                        {renderStepContent()}
                    </div>

                    <div className="stepper-navigation">
                        {currentStep > 1 && (
                            <button 
                                className="nav-button back"
                                onClick={handleBack}
                                disabled={loading}
                            >
                                <ArrowBack /> Back
                            </button>
                        )}
                        {currentStep < steps.length ? (
                            <button 
                                className="nav-button next"
                                onClick={handleNext}
                                disabled={loading}
                            >
                                Next <ArrowForward />
                            </button>
                        ) : (
                            <button 
                                className="nav-button submit"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit Biodata'}
                            </button>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CreateBiodata;