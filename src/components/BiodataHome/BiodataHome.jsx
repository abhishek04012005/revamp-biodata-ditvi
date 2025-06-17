import React from "react";
import BiodataCard from "../../structure/BiodataCards/BiodataCard";
import biodataList from "../../json/biodataDetails";
import SEO from "../SEO/SEO";
import { useLocation } from "react-router-dom";

const BiodataHome = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <SEO
          title="Marriage Biodata Maker | Traditional Indian Biodata Templates | Ditvi"
          description="Create professional marriage biodata online. Choose from premium traditional Indian biodata templates. Instant download, expert support & customization. Trusted by 500+ customers."
          keywords="marriage biodata maker, traditional biodata templates, Indian biodata format, online biodata creator, wedding profile maker"
          ogImage="https://biodata.ditvi.org/og-image.jpg"
          schema={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Ditvi Biodata Maker",
            description:
              "Professional marriage biodata creation service with traditional Indian templates",
            provider: {
              "@type": "Organization",
              name: "Ditvi",
              url: "https://biodata.ditvi.org",
            },
            areaServed: "IN",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Marriage Biodata Templates",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Traditional Marriage Biodata",
                    description:
                      "Handcrafted traditional Indian marriage biodata templates",
                  },
                },
              ],
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "500",
              bestRating: "5",
              worstRating: "1",
            },
          }}
        />
      )}
      <div className="biodata">
        <BiodataCard
          title="biodata"
          subtitle="Explore Premium Traditional Marriage Biodata Templates"
          biodataDetails={biodataList}
          isSlider={true}
        />
      </div>
    </>
  );
};

export default BiodataHome;
