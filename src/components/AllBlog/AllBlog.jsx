import React from 'react'
import BlogStructure from '../../structure/BlogStructure/BlogStructure'
import './AllBlog.css'
import blogPosts from '../../json/blog'

const AllBlog = () => {
  return (
    <>
    <BlogStructure title="Blogs" subtitle={`Explore our complete collection of articles and biodata creation guides`} blogPosts={blogPosts}/>
    </>
  )
}

export default AllBlog