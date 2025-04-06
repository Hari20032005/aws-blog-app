import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createComment } from '../../graphql/mutations';
import styled from 'styled-components';

const client = generateClient();

const CommentFormContainer = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: #292929;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1a8917;
  }
`;

const SubmitButton = styled.button`
  background-color: #1a8917;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0f6b0f;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

function CommentForm({ blogId, onCommentAdded }) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setLoading(true);
    
    try {
      const commentData = {
        blogID: blogId,
        content: comment,
        createdAt: new Date().toISOString()
      };
      
      const newComment = await client.graphql({
        query: createComment,
        variables: { input: commentData }
      });
      
      setComment('');
      
      // Notify parent component that a comment was added
      if (onCommentAdded) {
        onCommentAdded(newComment.data.createComment);
      }
    } catch (error) {
      console.error('Error creating comment:', error); // Log the full error object
      if (error.errors) {
        console.error('GraphQL Errors:', JSON.stringify(error.errors, null, 2)); // Log detailed GraphQL errors
      }
      alert('Error posting comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommentFormContainer>
      <FormTitle>Leave a Comment</FormTitle>
      <form onSubmit={handleSubmit}>
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          required
        />
        <SubmitButton type="submit" disabled={loading || !comment.trim()}>
          {loading ? 'Posting...' : 'Post Comment'}
        </SubmitButton>
      </form>
    </CommentFormContainer>
  );
}

export default CommentForm;
