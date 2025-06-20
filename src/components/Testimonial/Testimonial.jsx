import React from "react";
import "./Testimonial.css";
import Slider from "react-slick";
import Container from "../../structure/Container/Container";
import HeaderSection from "../../structure/HeaderSection/HeaderSection";
import { useLocation } from "react-router-dom";
import {
  ArrowBack,
  ArrowForward,
  Star,
  FormatQuote,
} from "@mui/icons-material";
import testimonials from "../../json/testimonial";
import SEO from "../SEO/SEO";

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <ArrowForward className={`${className} custom-arrow`} onClick={onClick} />
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <ArrowBack className={`${className} custom-arrow`} onClick={onClick} />
  );
};

const TestimonialCard = ({ data }) => {
  const stars = Array(data.rating).fill(null);

  return (
    <div className="testimonial-card">
      <div
        className="card-inner"
        style={{
          background: `linear-gradient(135deg, ${data.gradientColors[0]}, ${data.gradientColors[1]})`,
        }}
      >
        <div className="quote-icon">
          <FormatQuote />
        </div>

        <div className="testimonial-content">
          <div className="rating">
            {stars.map((_, index) => (
              <Star key={index} className="star" />
            ))}
          </div>

          <p className="testimonial-text">{data.testimonial}</p>

          <div className="author-info">
            <div className="author-image">
              <img src={data.image} alt={data.name} />
            </div>
            <div className="author-details">
              <h4 className="author-name">{data.name}</h4>
              <p className="author-role">{data.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  const location = useLocation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1225, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  return (
    <>
      {location.pathname !== "/" && (
        <SEO
          title="Client Testimonials | Biodata Maker Service Reviews"
          description="Read what our clients say about our biodata creation service. Real testimonials from satisfied customers who used our professional biodata templates."
          keywords="biodata testimonials, client reviews, biodata service reviews, marriage biodata feedback, customer testimonials"
          ogImage="https://your-domain.com/images/testimonials-preview.jpg"
          schema={{
            "@context": "https://schema.org",
            "@type": "Review",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Biodata Maker Service",
              description: "Professional biodata creation service",
              aggregateRating: {
                "@type": "AggregateRating",
                reviewCount: testimonials.length,
                bestRating: "5",
                worstRating: "1",
              },
              review: testimonials.map((testimonial) => ({
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: testimonial.rating,
                },
                author: {
                  "@type": "Person",
                  name: testimonial.name,
                },
                reviewBody: testimonial.testimonial,
              })),
            },
          }}
        />
      )}
      <div className="testimonial">
        <section className="testimonials-section">
          <div className="animated-circle circle-1"></div>
          <div className="animated-circle circle-2"></div>

          <Container>
            <HeaderSection
              title="Client Testimonials"
              subtitle={`What our clients say about our biodata design service`}
            />

            <div className="testimonials-slider">
              <Slider {...settings}>
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} data={testimonial} />
                ))}
              </Slider>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Testimonial;
