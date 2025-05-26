import React from 'react'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import whatsappUrlWithMobileNumber from '../../constants/communication';
import messageForFixedWhatsapp from '../../messages/whatsapp/message';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link as ScrollLink } from 'react-scroll';
import navLinks from '../../json/navLinks';
import Logo from '../../assets/logo.png';



const Navbar = () => {

    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleWhatsAppClick = () => {
      
        window.open("https://wa.me/919263767441?text=Hello%20Ditvi%20Biodata%2C%0AI%20want%20to%20learn%20more%20about%20your%20services.%0A%0AThank%20You%20%3A)", "_blank");
    };

    return (
        <>
            <nav className={`navbar-container ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="navbar-background"></div>
                <div className="navbar-inner">
                    <Link to="/" className="navbar-logo">
                        <img src={Logo} alt="Ditvi Biodata Logo" className="navbar-logo-img" />
                        <span className="navbar-logo-shine"></span>
                    </Link>

                    <div className={`navbar-menu ${isMobile ? 'navbar-menu-active' : ''}`}>
                        <ul className="navbar-list">
                            {navLinks.map((link) => (
                                <li
                                    key={link.id}
                                    className={`navbar-item ${activeLink === link.id ? 'navbar-item-active' : ''}`}
                                >
                                    {isHomePage && link.id !== '' ? (
                                        <ScrollLink
                                            to={link.id}
                                            className="navbar-link"
                                            smooth={true}
                                            duration={500}
                                            offset={-70}
                                            spy={true}
                                            onClick={() => {
                                                setIsMobile(false);
                                                setActiveLink(link.id);
                                            }}
                                        >
                                            <span className="navbar-link-icon">{link.icon}</span>
                                            <span className="navbar-link-text">{link.label}</span>
                                            <span className="navbar-link-decoration"></span>
                                        </ScrollLink>
                                    ) : (
                                        <Link
                                            to={`/${link.id}`}
                                            className="navbar-link"
                                            onClick={() => {
                                                setIsMobile(false);
                                                setActiveLink(link.id);
                                            }}
                                        >
                                            <span className="navbar-link-icon">{link.icon}</span>
                                            <span className="navbar-link-text">{link.label}</span>
                                            <span className="navbar-link-decoration"></span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        className="navbar-toggle"
                        onClick={() => setIsMobile(!isMobile)}
                        aria-label="Toggle menu"
                    >
                        <span className={`navbar-hamburger ${isMobile ? 'navbar-hamburger-active' : ''}`}></span>
                    </button>
                </div>
            </nav>

            <button className="navbar-whatsapp" onClick={handleWhatsAppClick}>
                <WhatsAppIcon className="navbar-whatsapp-icon" />
                <div className="navbar-whatsapp-ripple"></div>
                <span className="navbar-whatsapp-tooltip">Chat with us</span>
            </button>
        </>
    )
}

export default Navbar