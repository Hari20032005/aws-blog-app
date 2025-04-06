import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { getBlog } from '../graphql/queries';
import { updateBlog } from '../graphql/mutations';
import styled from 'styled-components';
import Loading from '../components/common/Loading';

const client = generateClient();

const EditBlogContainer = styled.div`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
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

const CancelButton = styled.button`
  background-color: #f5f5f5;
  color: #292929;
  border: 1px solid #ddd;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background-color: #ffebee;
  border-radius: 4px;
`;

function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchBlogDetail();
  }, [id]);

  async function fetchCurrentUser() {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }

  async function fetchBlogDetail() {
    try {
      const blogData = await client.graphql({
        query: getBlog,
        variables: { id }
      });
      
      const blog = blogData.data.getBlog;
      
      // Check if the current user is the owner of the blog
      if (currentUser && blog.owner !== currentUser.username) {
        setError('You do not have permission to edit this blog.');
        return;
      }
      
      setFormData({
        title: blog.title,
        content: blog.content,
        coverImage: blog.coverImage || ''
      });
    } catch (error) {
      console.error('Error fetching blog details:', error);
      setError('Error fetching blog details. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const blogData = {
        id,
        title: formData.title,
        content: formData.content,
        coverImage: formData.coverImage,
        updatedAt: new Date().toISOString()
      };
      
      await client.graphql({
        query: updateBlog,
        variables: { input: blogData }
      });
      
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Error updating blog. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/blog/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <EditBlogContainer>
      <PageTitle>Edit Blog</PageTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
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
        </FormGroup>
        
        <ButtonGroup>
          <SubmitButton type="submit" disabled={saving || !!error}>
            {saving ? 'Saving...' : 'Save Changes'}
          </SubmitButton>
          <CancelButton type="button" onClick={handleCancel}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </form>
    </EditBlogContainer>
  );
}

export default EditBlogPage;
