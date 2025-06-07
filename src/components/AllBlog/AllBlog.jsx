import React from "react";
import BlogStructure from "../../structure/BlogStructure/BlogStructure";
import SEO from "../SEO/SEO";
import "./AllBlog.css";
import blogPosts from "../../json/blog";

const AllBlog = () => {
  const seoData = {
    title: "Biodata Creation Blog - Tips & Guides | Ditvi Biodata",
    description: "Explore our comprehensive collection of articles about biodata creation, marriage profiles, and traditional matrimonial practices. Expert tips and professional guides.",
    keywords: "biodata blog, marriage profile tips, biodata creation guide, matrimonial advice, traditional biodata tips",
    ogImage: "/images/blog-og.jpg", // Add your blog OG image
    canonicalUrl: "https://yourdomain.com/blog", // Update with your domain
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Ditvi Biodata Blog",
      "description": "Professional guides and tips for creating perfect marriage biodata",
      "publisher": {
        "@type": "Organization",
        "name": "Ditvi Foundation",
        "logo": {
          "@type": "ImageObject",
          "url": "/images/logo.png" // Add your logo path
        }
      },
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": post.date,
        "author": {
          "@type": "Person",
          "name": post.author
        }
      }))
    }
  };

  return (
    <>
      <SEO {...seoData} />
      <BlogStructure
        title="Blogs"
        subtitle="Explore our complete collection of articles and biodata creation guides"
        blogPosts={blogPosts}
      />
    </>
  );
};

export default AllBlog;