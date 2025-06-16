import React from "react";
import "./BlogStructure.css";
import { useNavigate } from "react-router-dom";
import { Person, AccessTime, ArrowForward, Article } from "@mui/icons-material";
import HeaderSection from "../HeaderSection/HeaderSection";
import Container from "../Container/Container";
import BackButton from "../BackButton/BackButton";

const BlogCard = ({ post }) => {
  const navigate = useNavigate();
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  return (
    <div className="blog-card">
      <div className="blog-card-image">
        <img src={post.image} alt={post.title} loading="lazy" />
        <div className="blog-category">{post.category}</div>
      </div>
      <div className="blog-card-content">
        <div className="blog-meta">
          <div className="blog-meta-item">
            <Person />
            <span>{post.author}</span>
          </div>
          <div className="blog-meta-item">
            <AccessTime />
            <span>{post.readTime}</span>
          </div>
        </div>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <button
          className="blog-read-more"
          onClick={() => navigate(`/blog/${createSlug(post.title)}`)}
        >
          Read More
          <ArrowForward />
        </button>
      </div>
    </div>
  );
};

const BlogStructure = ({
  title,
  blogPosts,
  limit,
  subtitle,
  showBackButton,
}) => {
  const navigate = useNavigate();
  const displayedPosts = limit ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <>
      <section className="blog">
        <div className="blog-background">
          <div className="blog-circle circle-1"></div>
          <div className="blog-circle circle-2"></div>
        </div>
        <Container>
          <HeaderSection title={title} subtitle={subtitle} />

          {showBackButton && (
        
            <BackButton customPath={`/`} tooltipText="Back to Home" />
          )}

          <div className="blog-grid">
            {displayedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {limit && blogPosts.length > limit && (
            <div className="blog-more">
              <button
                className="blog-more-btn"
                onClick={() => navigate("/blog")}
              >
                <Article />
                <span>View More</span>
                <ArrowForward />
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default BlogStructure;
