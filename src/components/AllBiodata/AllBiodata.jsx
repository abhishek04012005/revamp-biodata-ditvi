import React from "react";
import "./AllBiodata.css";
import BiodataCard from "../../structure/BiodataCards/BiodataCard";
import biodataList from "../../json/biodataDetails";
import SEO from "../SEO/SEO";

const AllBiodata = () => {
  return (
    <>
      <SEO
        title="Professional Biodata Templates | Traditional Marriage Biodata Designs"
        description="Browse our collection of professional and traditional marriage biodata templates. Choose from various designs to create your perfect matrimonial profile."
        keywords="biodata templates, marriage biodata formats, traditional biodata designs, matrimonial profile templates, professional biodata maker"
        ogImage="https://your-domain.com/images/biodata-templates-preview.jpg"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Professional Biodata Templates",
          description: "Collection of traditional marriage biodata templates",
          publisher: {
            "@type": "Organization",
            name: "Biodata Maker",
            logo: {
              "@type": "ImageObject",
              url: "https://your-domain.com/logo.png",
            },
          },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: biodataList.length,
            itemListElement: biodataList.map((template, index) => ({
              "@type": "Product",
              position: index + 1,
              name: template.title,
              description: template.description,
            //   image: template.images[0],
              offers: {
                "@type": "Offer",
                price: template.price,
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
            })),
          },
        }}
      />

      <div className="allbiodata">
        <BiodataCard
          className="all-biodata-inner"
          title="biodata"
          subtitle="Discover our handcrafted traditional biodata designs"
          biodataDetails={biodataList}
          isSlider={false}
        />
      </div>
    </>
  );
};

export default AllBiodata;
