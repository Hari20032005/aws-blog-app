import React from 'react';
import styled from 'styled-components';
import BlogList from '../components/blog/BlogList';

const HeroSection = styled.section`
  background-color: #ffc017;
  padding: 5rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: #292929;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #292929;
  max-width: 700px;
  margin: 0 auto 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroButton = styled.button`
  background-color: #292929;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1a1a1a;
  }
`;

function HomePage() {
  return (
    <div>
      <HeroSection>
        <HeroTitle>Stay curious.</HeroTitle>
        <HeroSubtitle>
          Discover stories, thinking, and expertise from writers on any topic.
        </HeroSubtitle>
        <HeroButton onClick={() => window.location.href = '/create'}>
          Start Writing
        </HeroButton>
      </HeroSection>
      
      <BlogList />
    </div>
  );
}

export default HomePage;
