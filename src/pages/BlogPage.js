import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
// Removed incorrect observeQuery import
import { getCurrentUser } from 'aws-amplify/auth';
import { getBlog } from '../graphql/queries';
import { deleteBlog } from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Loading from '../components/common/Loading';
import LikeButton from '../components/social/LikeButton';
import CommentList from '../components/social/CommentList';
import CommentForm from '../components/social/CommentForm';
import ShareButton from '../components/social/ShareButton';

const client = generateClient();

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BlogHeader = styled.div`
  margin-bottom: 2rem;
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  color: #292929;
  margin-bottom: 1rem;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  color: #757575;
`;

const AuthorInfo = styled.div`
  margin-right: 1rem;
`;

const DateInfo = styled.div``;

const BlogActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const EditButton = styled.button`
  background-color: #f5f5f5;
  color: #292929;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const DeleteButton = styled.button`
  background-color: #ffebee;
  color: #d32f2f;
  border: 1px solid #ffcdd2;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #ffcdd2;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const BlogContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #292929;
  margin-bottom: 3rem;
`;

const SocialActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
`;

const CommentsSection = styled.div`
  margin-top: 3rem;
`;

function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  // Removed commentCount state as it will be derived from blog.comments

  // Use useCallback to memoize fetchBlogDetail
  const fetchBlogDetail = useCallback(async () => {
    console.log(`Attempting to fetch blog with ID: ${id}`); // Log the ID being used
    setLoading(true); // Set loading true when fetching
    try {
      // Explicitly use apiKey auth mode for public read access
      // Explicitly use apiKey for public read, as default is Cognito
      const blogData = await client.graphql({
        query: getBlog,
        variables: { id },
        authMode: 'apiKey' 
      });
      console.log('Raw blogData response:', blogData); // Log the raw response
      // Check if blog data exists before setting state
      if (blogData.data.getBlog) {
        setBlog(blogData.data.getBlog);
      } else {
        // Handle case where blog is not found (e.g., deleted)
        console.warn(`Blog with ID ${id} not found.`);
        setBlog(null); 
      }
    } catch (error) {
      console.error('Error fetching blog details:', error.errors || error); // Log specific GraphQL errors
      setBlog(null); // Set blog to null on error
    } finally {
      setLoading(false);
    }
  }, [id]); // Dependency array includes id

  useEffect(() => {
    fetchCurrentUser();
    fetchBlogDetail();
  }, [id, fetchBlogDetail]); // Add fetchBlogDetail to dependency array

  // Wrap checkOwnership in useCallback
  const checkOwnership = useCallback(() => {
    if (blog && currentUser && blog.owner === currentUser.username) {
      setIsOwner(true);
    } else {
      setIsOwner(false); // Ensure isOwner is false otherwise
    }
  }, [currentUser, blog]); // Dependencies for useCallback

  useEffect(() => {
    checkOwnership(); // Call the memoized function
  }, [checkOwnership]); // Use memoized function in dependency array

  async function fetchCurrentUser() {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }

  // Removed original definition of checkOwnership as it's now useCallback wrapped

  // Setup subscriptions
  useEffect(() => {
    if (!id || !client) return; // Ensure id and client are available

    console.log(`Setting up subscriptions for blog ID: ${id}`);

    // Helper function to update blog state immutably
    const updateBlogState = (updater) => {
      setBlog(currentBlog => {
        if (!currentBlog) return null; // Blog not loaded yet
        return updater(currentBlog);
      });
    };

    // --- Subscription for onCreateComment ---
    const createCommentSub = client.graphql({ query: subscriptions.onCreateComment })
      .subscribe({
        next: ({ data }) => {
          const newComment = data?.onCreateComment;
          if (newComment && newComment.blogID === id) {
            console.log('onCreateComment subscription received:', newComment);
            updateBlogState(currentBlog => ({
              ...currentBlog,
              comments: {
                ...currentBlog.comments,
                // Add the new comment, ensuring items is an array
                items: [...(currentBlog.comments?.items || []), newComment],
              },
            }));
          }
        },
        error: error => console.warn('Subscription error (onCreateComment):', error),
      });

    // --- Subscription for onDeleteComment ---
    const deleteCommentSub = client.graphql({ query: subscriptions.onDeleteComment })
      .subscribe({
        next: ({ data }) => {
          const deletedComment = data?.onDeleteComment;
          if (deletedComment && deletedComment.blogID === id) {
            console.log('onDeleteComment subscription received:', deletedComment);
            updateBlogState(currentBlog => ({
              ...currentBlog,
              comments: {
                ...currentBlog.comments,
                // Filter out the deleted comment
                items: (currentBlog.comments?.items || []).filter(comment => comment.id !== deletedComment.id),
              },
            }));
          }
        },
        error: error => console.warn('Subscription error (onDeleteComment):', error),
      });

    // --- Subscription for onCreateLike ---
    const createLikeSub = client.graphql({ query: subscriptions.onCreateLike })
      .subscribe({
        next: ({ data }) => {
          const newLike = data?.onCreateLike;
          if (newLike && newLike.blogID === id) {
            console.log('onCreateLike subscription received:', newLike);
            updateBlogState(currentBlog => ({
              ...currentBlog,
              likes: {
                ...currentBlog.likes,
                // Add the new like, ensuring items is an array
                items: [...(currentBlog.likes?.items || []), newLike],
              },
            }));
          }
        },
        error: error => console.warn('Subscription error (onCreateLike):', error),
      });

    // --- Subscription for onDeleteLike ---
    const deleteLikeSub = client.graphql({ query: subscriptions.onDeleteLike })
      .subscribe({
        next: ({ data }) => {
          const deletedLike = data?.onDeleteLike;
          if (deletedLike && deletedLike.blogID === id) {
            console.log('onDeleteLike subscription received:', deletedLike);
            updateBlogState(currentBlog => ({
              ...currentBlog,
              likes: {
                ...currentBlog.likes,
                // Filter out the deleted like
                items: (currentBlog.likes?.items || []).filter(like => like.id !== deletedLike.id),
              },
            }));
          }
        },
        error: error => console.warn('Subscription error (onDeleteLike):', error),
      });

    // Cleanup function
    return () => {
      console.log(`Cleaning up subscriptions for blog ID: ${id}`);
      createCommentSub.unsubscribe();
      deleteCommentSub.unsubscribe();
      createLikeSub.unsubscribe();
      deleteLikeSub.unsubscribe();
    };
  }, [id]); // Dependency only on id, as setBlog is stable

  async function handleDeleteBlog() {
    if (!window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }
    
    try {
      await client.graphql({
        query: deleteBlog,
        variables: { input: { id: blog.id } }
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog. Please try again.');
    }
  }

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle comment added (now just triggers refetch via subscription)
  const handleCommentAdded = (newComment) => {
    // No longer need to manually update state here, subscription will handle it.
    // We could potentially update the state optimistically here for faster UI feedback
    // but refetching via subscription is simpler for now.
    console.log('Comment added locally, waiting for subscription update.');
  };

  if (loading && !blog) return <Loading />; // Show loading only if blog is not yet loaded
  if (!blog) return <div>Blog not found</div>;

  return (
    <BlogContainer>
      <BlogHeader>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogMeta>
          <AuthorInfo>By {blog.owner}</AuthorInfo>
          <DateInfo>{formatDate(blog.createdAt)}</DateInfo>
        </BlogMeta>
        
        {isOwner && (
          <BlogActions>
            <EditButton onClick={() => navigate(`/edit/${blog.id}`)}>
              Edit Blog
            </EditButton>
            <DeleteButton onClick={handleDeleteBlog}>
              Delete Blog
            </DeleteButton>
          </BlogActions>
        )}
      </BlogHeader>
      
      {blog.coverImage && (
        <CoverImage src={blog.coverImage} alt={blog.title} />
      )}
      
      <BlogContent>
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </BlogContent>
      
      <SocialActions>
        {/* Pass the entire blog object or necessary parts if LikeButton needs more context */}
        <LikeButton blogId={blog.id} /> 
        <ShareButton blogId={blog.id} title={blog.title} />
      </SocialActions>
      
      <CommentsSection>
        <CommentForm 
          blogId={blog.id} 
          onCommentAdded={handleCommentAdded} 
        />
        {/* Pass comments directly to CommentList */}
        <CommentList 
          comments={blog.comments?.items || []} 
          blogId={blog.id} // Keep blogId if needed for other logic within CommentList
        />
      </CommentsSection>
    </BlogContainer>
  );
}

export default BlogPage;
