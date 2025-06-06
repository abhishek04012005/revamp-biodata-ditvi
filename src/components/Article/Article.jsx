import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Background from "../../structure/Background/Background";
import Container from '../../structure/Container/Container';
import HeaderSection from "../../structure/HeaderSection/HeaderSection";
import { 
  Person, 
  AccessTime, 
  ThumbUp, 
  Share, 
  CalendarToday,
  Bookmark,
  BookmarkBorder 
} from '@mui/icons-material';
import { Snackbar } from "@mui/material";
import './Article.css';
import SEO from '../SEO/SEO';
import articles from '../../json/article';

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const baseUrl = window.location.origin;

  const createSlug = (title) => {
    return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  };

  useEffect(() => {
    const currentArticle = articles.find(a => createSlug(a.title) === slug);
    if (currentArticle) {
      setArticle(currentArticle);
      setRelatedArticles(
        articles
          .filter(a => a.category === currentArticle.category && a.id !== currentArticle.id)
          .slice(0, 3)
      );
    } else {
      navigate('/articles');
    }
  }, [slug, navigate]);

  const handleLike = () => {
    if (!hasLiked && article) {
      setArticle({
        ...article,
        likes: (article.likes || 0) + 1
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
          title: article.title,
          text: article.excerpt,
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

  if (!article) return null;

  const seoData = {
    title: article.meta?.title || `${article.title} | Biodata Maker Articles`,
    description: article.meta?.description || article.excerpt,
    keywords: article.meta?.keywords || `${article.category}, ${article.tags.join(', ')}`,
    ogImage: article.meta?.ogImage || article.image,
    canonicalUrl: `${baseUrl}/articles/${slug}`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt,
      "image": article.image,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Biodata Maker",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "datePublished": article.date,
      "dateModified": article.meta?.lastModified || article.date,
      "articleBody": article.content.replace(/<[^>]+>/g, ''),
      "keywords": article.tags.join(', '),
      "articleSection": article.category
    }
  };

  return (
    <>
      <SEO {...seoData} />
      <Background>
        <div className="article-details">
          <Container>
            <div className="article-wrapper">
              <div className="article-navigation">
                <button className="article-back" onClick={() => navigate("/articles")}>
                  <span>Back</span>
                </button>
                <div className="article-actions">
                  <button
                    className={`article-like ${hasLiked ? "active" : ""}`}
                    onClick={handleLike}
                  >
                    <ThumbUp />
                    <span>{article?.likes || 0}</span>
                  </button>
                  <button
                    className={`article-bookmark ${isBookmarked ? "active" : ""}`}
                    onClick={handleBookmark}
                  >
                    {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                  </button>
                  <button className="article-share-btn" onClick={handleShare}>
                    <Share />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              <div className="article-header">
                {/* <div className="article-category">{article.category}</div> */}
                <h1 className="article-title">{article.title}</h1>
                <div className="article-meta">
                  <div className="article-meta-item">
                    <Person />
                    <span>{article.author}</span>
                  </div>
                  <div className="article-meta-item">
                    <CalendarToday />
                    <span>{article.date}</span>
                  </div>
                  <div className="article-meta-item">
                    <AccessTime />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="article-featured-image">
                <img src={article.image} alt={article.title} />
              </div>

              <div className="article-content">
                <div 
                  className="article-text"
                  dangerouslySetInnerHTML={{ __html: article.content }} 
                />

                <div className="article-tags">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="article-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {relatedArticles.length > 0 && (
                <div className="article-related">
                  <HeaderSection
                    title="Related Articles"
                    subtitle="You might also like these articles"
                  />
                  <div className="article-related-grid">
                    {relatedArticles.map((relatedArticle) => (
                      <div
                        key={relatedArticle.id}
                        className="article-related-card"
                        onClick={() =>
                          navigate(`/articles/${createSlug(relatedArticle.title)}`)
                        }
                      >
                        <div className="related-image">
                          <img src={relatedArticle.image} alt={relatedArticle.title} />
                          <div className="related-category">
                            {relatedArticle.category}
                          </div>
                        </div>
                        <div className="related-content">
                          <h3>{relatedArticle.title}</h3>
                          <p>{relatedArticle.excerpt}</p>
                          <div className="related-meta">
                            <span>{relatedArticle.date}</span>
                            <span>{relatedArticle.readTime}</span>
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

export default Article;