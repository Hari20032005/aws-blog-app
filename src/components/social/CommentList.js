import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { listComments } from '../../graphql/queries';
import { deleteComment } from '../../graphql/mutations';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

const client = generateClient();

const CommentListContainer = styled.div`
  margin-top: 2rem;
`;

const CommentListTitle = styled.h3`
  font-size: 1.5rem;
  color: #292929;
  margin-bottom: 1.5rem;
`;

const CommentItem = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.div`
  font-weight: 500;
  color: #292929;
`;

const CommentDate = styled.div`
  color: #757575;
  font-size: 0.9rem;
`;

const CommentContent = styled.div`
  color: #292929;
  line-height: 1.6;
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #d32f2f;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background-color: #ffebee;
  }
  
  svg {
    margin-right: 0.3rem;
    font-size: 0.9rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #757575;
`;

// Accept comments prop, keep blogId if needed for delete, remove internal state
function CommentList({ comments = [], blogId }) { 
  // Removed internal comments and loading state
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Removed useEffect for fetchComments

  async function fetchCurrentUser() {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }

  // Removed fetchComments function

  async function handleDeleteComment(commentId) {
    // Parent (BlogPage) handles state update via subscription
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    
    try {
      await client.graphql({
        query: deleteComment,
        variables: { input: { id: commentId } }
      });
      // Removed setComments call - update handled by parent subscription
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Error deleting comment. Please try again.');
    }
  }

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Removed loading check

  return (
    <CommentListContainer>
      <CommentListTitle>
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </CommentListTitle>
      
      {comments.length === 0 ? (
        <EmptyState>
          <p>No comments yet. Be the first to share your thoughts!</p>
        </EmptyState>
      ) : (
        comments.map(comment => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <CommentAuthor>{comment.owner}</CommentAuthor>
              <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
            </CommentHeader>
            <CommentContent>{comment.content}</CommentContent>
            
            {currentUser && currentUser.username === comment.owner && (
              <CommentActions>
                <DeleteButton onClick={() => handleDeleteComment(comment.id)}>
                  <FaTrash /> Delete
                </DeleteButton>
              </CommentActions>
            )}
          </CommentItem>
        ))
      )}
    </CommentListContainer>
  );
}

export default CommentList;
