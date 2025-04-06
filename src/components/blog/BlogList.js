import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { generateClient } from 'aws-amplify/api';
import { listBlogs } from '../../graphql/queries';
import BlogCard from './BlogCard';
import Loading from '../common/Loading';

const client = generateClient();

const BlogListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BlogListHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const BlogListTitle = styled.h2`
  font-size: 2.5rem;
  color: #292929;
  margin-bottom: 1rem;
`;

const BlogListDescription = styled.p`
  color: #757575;
  font-size: 1.2rem;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #757575;
`;

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    try {
      // Explicitly use apiKey for public read, as default is Cognito
      const blogData = await client.graphql({
        query: listBlogs,
        authMode: 'apiKey' 
      });
      
      const blogList = blogData.data.listBlogs.items;
      // Sort blogs by creation date (newest first)
      const sortedBlogs = blogList.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBlogs(sortedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <BlogListContainer>
      <BlogListHeader>
        <BlogListTitle>Discover Stories</BlogListTitle>
        <BlogListDescription>
          Read and share ideas from independent voices, world-class publications, and experts.
        </BlogListDescription>
      </BlogListHeader>
      
      {blogs.length === 0 ? (
        <EmptyState>
          <h3>No blogs found</h3>
          <p>Be the first to share your story!</p>
        </EmptyState>
      ) : (
        <BlogGrid>
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </BlogGrid>
      )}
    </BlogListContainer>
  );
}

export default BlogList;
