import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogDetail.css'
import Background from '../../structure/Background/Background'
import Container from '../../structure/Container/Container'
import { ThumbUp, Bookmark, BookmarkBorder, Share } from '@mui/icons-material'
import blogPosts from '../../json/blog'


const createSlug = (title) => {
    return title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
};

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);


    useEffect(() => {
        const currentPost = blogPosts.find(post => createSlug(post.title) === slug);
        if (currentPost) {
            setPost(currentPost);
            setRelatedPosts(blogPosts.filter(p =>
                p.id !== currentPost.id &&
                p.category === currentPost.category
            ).slice(0, 3));
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    const handleLike = () => {
        if (!hasLiked && post) {
            // Update post with new likes count
            setPost({
                ...post,
                likes: post.likes + 1
            });
            setHasLiked(true);
        }
    }

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    }

    const handleShare = async () => {

    }



    return (
        <>
            <Background>
                <div className='blog-details'>
                    <Container>
                        <div className="blogdetail-wrapper">
                            <div className="blogdetail-navigation">
                                <button
                                    className="blogdetail-back"
                                    onClick={() => navigate('/')}
                                >

                                    <span>Back</span>
                                </button>
                                <div className="blogdetail-actions">
                                    <button
                                        className={`blogdetail-like ${hasLiked ? 'active' : ''}`}
                                        onClick={handleLike}
                                    >
                                        <ThumbUp />
                                        <span>{post?.likes || 0}</span>
                                    </button>
                                    <button
                                        className={`blogdetail-bookmark ${isBookmarked ? 'active' : ''}`}
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
                            </div>

                        </div>
                    </Container>
                </div>
            </Background>
        </>
    )
}

export default BlogDetail