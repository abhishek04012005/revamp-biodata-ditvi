import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Person, 
  AccessTime, 
  ArrowForward, 
  Article, 
  Search,
  FilterList 
} from "@mui/icons-material";
import Container from "../../structure/Container/Container";
import HeaderSection from "../../structure/HeaderSection/HeaderSection";
import articles from "../../json/article";
import "./ArticleBox.css";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  return (
    <div className="article-card">
      <div className="article-card-image">
        <img src={article.image} alt={article.title} loading="lazy" />
        <div className="article-category">{article.category}</div>
      </div>
      <div className="article-card-content">
        <div className="article-meta">
          <div className="article-meta-item">
            <Person />
            <span>{article.author}</span>
          </div>
          <div className="article-meta-item">
            <AccessTime />
            <span>{article.readTime}</span>
          </div>
        </div>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{article.excerpt}</p>
        <button
          className="article-read-more"
          onClick={() => navigate(`/articles/${createSlug(article.title)}`)}
        >
          Read More
          <ArrowForward />
        </button>
      </div>
    </div>
  );
};

const ArticleBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = ["all", ...new Set(articles.map(article => article.category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <section className="articles">
      <div className="articles-background">
        <div className="articles-circle circle-1"></div>
        <div className="articles-circle circle-2"></div>
      </div>
      <Container>
        <HeaderSection 
          title="All Articles" 
          subtitle="Browse our complete collection of biodata creation guides and tips" 
        />

        <div className="articles-filters">
          <div className="search-box">
            <Search />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <FilterList />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="no-articles">
            <Article fontSize="large" />
            <h3>No articles found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ArticleBox;