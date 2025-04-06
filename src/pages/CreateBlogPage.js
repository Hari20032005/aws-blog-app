import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { createBlog } from '../graphql/mutations';
import styled from 'styled-components';

const client = generateClient();

const CreateBlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #292929;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #292929;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #1a8917;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 300px;
  
  &:focus {
    outline: none;
    border-color: #1a8917;
  }
`;

const SubmitButton = styled.button`
  background-color: #1a8917;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
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

const MarkdownTips = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  
  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  ul {
    margin: 0;
    padding-left: 1.5rem;
  }
`;

function CreateBlogPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const blogData = {
        title: formData.title,
        content: formData.content,
        coverImage: formData.coverImage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const newBlog = await client.graphql({
        query: createBlog,
        variables: { input: blogData }
      });
      
      navigate(`/blog/${newBlog.data.createBlog.id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Error creating blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateBlogContainer>
      <PageTitle>Create New Blog</PageTitle>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter a catchy title"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
          <Input
            type="text"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your blog content here..."
          />
          
          <MarkdownTips>
            <h4>Markdown Tips:</h4>
            <ul>
              <li>Use # for headings (# Heading 1, ## Heading 2)</li>
              <li>Use **text** for bold, *text* for italic</li>
              <li>Use [link text](URL) for links</li>
              <li>Use ![alt text](image-url) for images</li>
              <li>Use > for blockquotes</li>
            </ul>
          </MarkdownTips>
        </FormGroup>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Blog'}
        </SubmitButton>
      </form>
    </CreateBlogContainer>
  );
}

export default CreateBlogPage;
