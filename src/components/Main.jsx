import React, { useState, useEffect } from 'react';
import Hero from './Hero/Hero'
import BiodataHome from './BiodataHome/BiodataHome'
import WhyUs from './WhyUs/WhyUs'
import WeWork from './WeWork/WeWork'
import ContactUs from './ContactUs/ContactUs'
import BlogHome from './BlogHome/BlogHome'
import Testimonial from './Testimonial/Testimonial'
import SEO from './SEO/SEO'
import { maintenanceConfig } from '../json/maintenancePopup';
import MaintenancePopup from './MaintenancePopup/MaintenancePopup';


const Main = () => {
        const [showMaintenance, setShowMaintenance] = useState(false);

          useEffect(() => {
        if (maintenanceConfig.isMaintenanceMode) {
            setShowMaintenance(true);
        }
    }, []);
    const seoData = {
        title: "Ditvi Biodata - Professional Marriage Biodata Creation Service",
        description: "Create professional and traditional marriage biodata with Ditvi Biodata. Expert service with 100% satisfaction guarantee. Customized templates for your perfect match.",
        keywords: "marriage biodata, biodata creation, traditional biodata, professional biodata service, matrimony biodata",
        ogImage: "/images/ditvi-biodata-og.jpg", // Add your OG image path
        canonicalUrl: "https://biodata.ditvi.org", // Add your domain
        schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Ditvi Biodata",
            "description": "Professional Marriage Biodata Creation Service",
            "provider": {
                "@type": "Organization",
                "name": "Ditvi Foundation",
                "image": "/images/logo.png" // Add your logo path
            },
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Biodata Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Traditional Biodata Creation"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Modern Biodata Design"
                        }
                    }
                ]
            }
        }
    };

    return (
        <>
            <SEO {...seoData} />
               {showMaintenance && (
                <MaintenancePopup
                    message={maintenanceConfig.maintenanceMessage}
                    estimatedTime={maintenanceConfig.estimatedDowntime}
                    onClose={() => setShowMaintenance(false)}
                />
            )}
            <Hero />
            <BiodataHome />
            <WhyUs />
            <WeWork />
            <BlogHome />
            <Testimonial />
            <ContactUs />
        </>
    )
}

export default Main