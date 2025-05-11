import React from 'react'
import './BlogHome.css'
import blogPosts from '../../json/blog'
import BlogStructure from '../../structure/BlogStructure/BlogStructure'

const BlogHome = () => {
  return (
    <>
      <div className="blog">
        <BlogStructure title="Latest Blogs" subtitle={`Stay updated with our latest articles and biodata creation tips`} blogPosts={blogPosts} limit={3}/>
      </div>
    </>
  )
}

export default BlogHome