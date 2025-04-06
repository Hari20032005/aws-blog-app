import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-image: url(${props => props.$image || 'https://via.placeholder.com/800x400?text=No+Image'});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #292929;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #757575;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const CardExcerpt = styled.p`
  color: #292929;
  margin-bottom: 1.5rem;
`;

const ReadMoreLink = styled(Link)`
  display: inline-block;
  color: #1a8917;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

function BlogCard({ blog }) {
  // Create a truncated excerpt from the blog content
  const createExcerpt = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card>
      <CardImage $image={blog.coverImage} />
      <CardContent>
        <CardTitle>{blog.title}</CardTitle>
        <CardMeta>
          <span>By {blog.owner}</span>
          <span>{formatDate(blog.createdAt)}</span>
        </CardMeta>
        <CardExcerpt>{createExcerpt(blog.content)}</CardExcerpt>
        <ReadMoreLink to={`/blog/${blog.id}`}>Read more</ReadMoreLink>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
