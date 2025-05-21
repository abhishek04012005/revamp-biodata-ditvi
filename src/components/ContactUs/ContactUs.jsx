import React, { useState } from 'react'
import './ContactUs.css'
import Container from '../../structure/Container/Container'
import HeaderSection from '../../structure/HeaderSection/HeaderSection'
import Grid from '@mui/material/Grid';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { Email, Phone, Person, Message } from '@mui/icons-material';
import ContactUsImg from '../../assets/contactus.svg'
import { ContactUsStorage } from '../../supabase/ContactUs';


const ContactUs = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        number: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            
            const response = await ContactUsStorage.saveContactUs({
                name: formData.name,
                email: formData.email,
                mobile: formData.number,
                message: formData.message,
            });

            if (response) {
                alert("Thank You! We'll get back to you soon.");
                setFormData({ name: '', email: '', message: '', number: '' });
            } else {
                alert("There was an error submitting the form.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error submitting the form.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="contact-us">
                <section className="contact">
                    <div className="contact-background">
                        <div className="contact-circle circle-1"></div>
                        <div className="contact-circle circle-2"></div>
                    </div>

                    <Container>

                        <HeaderSection title="Contact Us" subtitle={`We'd love to hear from you. Send us a message and we'll respond as soon as possible`} />

                        <Grid container direction={{ xs: 'column-reverse', md: 'row' }}
                            spacing={{ xs: 5, md: 3, lg: 20 }} className="contact-grid">
                            <Grid size={{ xs: 12, md: 6 }} className="contact-form-wrapper">
                                <div className="contact-card">
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit}
                                        className="contact-form"
                                    >
                                        <div className="contact-input-wrapper">
                                            <Person className="contact-input-icon" />
                                            <TextField
                                                className="contact-input"
                                                label="Your Name"
                                                name="name"
                                                variant="outlined"
                                                value={formData.name}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                            />
                                        </div>

                                        <div className="contact-input-wrapper">
                                            <Email className="contact-input-icon" />
                                            <TextField
                                                className="contact-input"
                                                label="Your Email"
                                                name="email"
                                                type="email"
                                                variant="outlined"
                                                value={formData.email}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                            />
                                        </div>

                                        <div className="contact-input-wrapper">
                                            <Phone className="contact-input-icon" />
                                            <TextField
                                                className="contact-input"
                                                label="Mobile Number"
                                                name="number"
                                                type="tel"
                                                variant="outlined"
                                                value={formData.number}
                                                onChange={handleChange}
                                                fullWidth
                                                required
                                            />
                                        </div>

                                        <div className="contact-input-wrapper">
                                            <Message className="contact-input-icon message-icon" />
                                            <TextField
                                                className="contact-input"
                                                label="Your Message"
                                                name="message"
                                                variant="outlined"
                                                value={formData.message}
                                                onChange={handleChange}
                                                multiline
                                                rows={0}
                                                fullWidth
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            className="contact-submit-btn"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <CircularProgress size={24} className="contact-loader" />
                                            ) : (
                                                "Send Message"
                                            )}
                                            <div className="contact-btn-shine"></div>
                                        </Button>
                                    </Box>
                                </div>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }} className="contact-image-wrapper">
                                <div className="contact-image-card">
                                    <img src={ContactUsImg} alt="Contact Us Illustration" />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default ContactUs