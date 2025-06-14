import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetail.css";
import Background from "../../structure/Background/Background";
import Container from "../../structure/Container/Container";
import {
  ThumbUp,
  Bookmark,
  BookmarkBorder,
  Share,
  Person,
  CalendarToday,
  AccessTime,
} from "@mui/icons-material";
import { Snackbar } from "@mui/material";
import blogPosts from "../../json/blog";
import HeaderSection from "../../structure/HeaderSection/HeaderSection";
import SEO from "../SEO/SEO";
import BackButton from "../../structure/BackButton/BackButton";

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const baseUrl = window.location.origin;
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const currentPost = blogPosts.find(
      (post) => createSlug(post.title) === slug
    );
    if (currentPost) {
      setPost(currentPost);
      setRelatedPosts(
        blogPosts
          .filter(
            (p) =>
              p.id !== currentPost.id && p.category === currentPost.category
          )
          .slice(0, 3)
      );
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const handleLike = () => {
    if (!hasLiked && post) {
      // Update post with new likes count
      setPost({
        ...post,
        likes: post.likes + 1,
      });
      setHasLiked(true);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setSnackbarMessage("Link copied to clipboard!");
        setOpenSnackbar(true);
      } catch (err) {
        setSnackbarMessage("Failed to copy link");
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  if (!post) return null;

  const seoData = {
    title: post.meta?.title || `${post.title} | Biodata Maker Blog`,
    description: post.meta?.description || post.excerpt,
    keywords:
      post.meta?.keywords ||
      `${post.category.toLowerCase()}, ${post.tags.join(", ")}, biodata tips`,
    ogImage: post.meta?.ogImage || post.image,
    canonicalUrl: `${baseUrl}/blog/${slug}`,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      author: {
        "@type": "Person",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        name: "Biodata Maker",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
      datePublished: post.date,
      dateModified: post.meta?.lastModified || post.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${slug}`,
      },
      keywords: post.tags.join(", "),
      articleSection: post.category,
      timeRequired: post.readTime,
      articleBody: post.content.replace(/<[^>]+>/g, ""), // Strip HTML tags
      relatedLink: relatedPosts.map(
        (related) => `${baseUrl}/blog/${createSlug(related.title)}`
      ),
    },
  };

  return (
    <>
      <SEO {...seoData} />
      <Background>
        <div className="blog-details">
          <Container>
            <div className="blogdetail-wrapper">
              <div className="blogdetail-navigation">
          

                <BackButton customPath={"/blog"} tooltipText="Back to Blog" />

                <div className="blogdetail-actions">
                  <button
                    className={`blogdetail-like ${hasLiked ? "active" : ""}`}
                    onClick={handleLike}
                  >
                    <ThumbUp />
                    <span>{post?.likes || 0}</span>
                  </button>
                  <button
                    className={`blogdetail-bookmark ${
                      isBookmarked ? "active" : ""
                    }`}
                    onClick={handleBookmark}
                  >
                    {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                  </button>

                  <button
                    className="blogdetail-share-btn"
                    onClick={handleShare}
                  >
                    <Share />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              <div className="blogdetail-header">
                <div className="blogdetail-category">{post.category}</div>
                <h1 className="blogdetail-title">{post.title}</h1>

                <div className="blogdetail-meta">
                  <div className="blogdetail-meta-item">
                    <Person />
                    <span>{post.author}</span>
                  </div>
                  <div className="blogdetail-meta-item">
                    <CalendarToday />
                    <span>{post.date}</span>
                  </div>
                  <div className="blogdetail-meta-item">
                    <AccessTime />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="blogdetail-featured-image">
                <img src={post.image} alt={post.title} />
              </div>

              <div className="blogdetail-content">
                <div
                  className="blogdetail-text"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="blogdetail-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="blogdetail-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="blogdetail-related">
                  <HeaderSection
                    title="Related Articles"
                    subtitle={`Here is related post`}
                  />
                  <div className="blogdetail-related-grid">
                    {relatedPosts.map((relatedPost) => (
                      <div
                        key={relatedPost.id}
                        className="blogdetail-related-card"
                        onClick={() =>
                          navigate(`/blog/${createSlug(relatedPost.title)}`)
                        }
                      >
                        <div className="related-image">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                          />
                          <div className="related-category">
                            {relatedPost.category}
                          </div>
                        </div>
                        <div className="related-content">
                          <h3>{relatedPost.title}</h3>
                          <p>{relatedPost.excerpt}</p>
                          <div className="related-meta">
                            <span>{relatedPost.date}</span>
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              />
            </div>
          </Container>
        </div>
      </Background>
    </>
  );
};

export default BlogDetail;
