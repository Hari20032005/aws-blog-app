import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { createLike, deleteLike } from '../../graphql/mutations';
import { listLikes } from '../../graphql/queries';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const client = generateClient();

const LikeButtonContainer = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${props => props.$liked ? '#e0245e' : '#757575'};
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.$liked ? '#ffebee' : '#f5f5f5'};
  }
  
  svg {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

function LikeButton({ blogId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeId, setLikeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Wrap functions used in useEffect with useCallback
  const checkUserLike = useCallback(async () => {
    if (!currentUser || !blogId) return; // Guard clause
    // Reset state before checking
    setLiked(false);
    setLikeId(null);
    setLoading(true); // Indicate loading state
    try {
      const likeData = await client.graphql({
        query: listLikes,
        variables: {
          filter: {
            blogID: { eq: blogId },
            owner: { eq: currentUser.username }
          }
        }
      });
      
      const userLikes = likeData.data.listLikes.items;
      
      if (userLikes.length > 0) {
        setLiked(true);
        setLikeId(userLikes[0].id);
      }
    } catch (error) {
      console.error('Error checking user like:', error);
    } finally {
      // Only set loading false if fetchLikeCount isn't also running
      // Or manage loading state more granularly if needed
    }
  }, [currentUser, blogId]); // Dependencies for useCallback

  const fetchLikeCount = useCallback(async () => {
     if (!blogId) return; // Guard clause
     setLoading(true); // Indicate loading state
    try {
      const likeData = await client.graphql({
        query: listLikes,
        variables: {
          filter: {
            blogID: { eq: blogId }
          }
        }
      });
      
      setLikeCount(likeData.data.listLikes.items.length);
    } catch (error) {
      console.error('Error fetching like count:', error);
    } finally {
       setLoading(false); // Set loading false after both checks potentially finish
    }
  }, [blogId]); // Dependencies for useCallback


  useEffect(() => {
    // Call the memoized functions
    checkUserLike();
    fetchLikeCount();
  }, [checkUserLike, fetchLikeCount]); // Use memoized functions in dependency array

  async function fetchCurrentUser() {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
      setLoading(false); // Keep this for fetchCurrentUser
    }
  }

  // Removed original definitions of checkUserLike and fetchLikeCount as they are now useCallback wrapped

  async function handleLikeToggle() {
    if (!currentUser) return;
    
    setLoading(true);
    
    try {
      if (liked) {
        // Unlike the blog
        await client.graphql({
          query: deleteLike,
          variables: { 
            input: { id: likeId } 
          }
        });
        setLiked(false);
        setLikeCount(prevCount => prevCount - 1);
        setLikeId(null); // Clear likeId after unliking
      } else {
        // Like the blog
        const newLike = await client.graphql({
          query: createLike,
          variables: { 
            input: { 
              blogID: blogId
              // owner is automatically added by AppSync based on authenticated user
            } 
          }
        });
        setLiked(true);
        setLikeId(newLike.data.createLike.id);
        setLikeCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error); // Log the full error object
      if (error.errors) {
        console.error('GraphQL Errors:', JSON.stringify(error.errors, null, 2)); // Log detailed GraphQL errors
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <LikeButtonContainer 
      onClick={handleLikeToggle} 
      disabled={loading || !currentUser}
      $liked={liked}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
      {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
    </LikeButtonContainer>
  );
}

export default LikeButton;
