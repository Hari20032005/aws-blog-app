import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { listBlogs } from '../graphql/queries';
import styled from 'styled-components';
import BlogCard from '../components/blog/BlogCard';
import Loading from '../components/common/Loading';

const client = generateClient();

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f5f5f5;
  background-image: url(${props => props.image || 'https://via.placeholder.com/150'});
  background-size: cover;
  background-position: center;
  margin-right: 2rem;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-size: 2.5rem;
  color: #292929;
  margin-bottom: 0.5rem;
`;

const ProfileEmail = styled.p`
  color: #757575;
  margin-bottom: 1rem;
`;

const ProfileBio = styled.p`
  color: #292929;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const BlogSection = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #292929;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
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

function ProfilePage() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserBlogs();
    }
  }, [user]);

  async function fetchCurrentUser() {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }

  async function fetchUserBlogs() {
    try {
      const blogData = await client.graphql({
        query: listBlogs
      });
      
      const allBlogs = blogData.data.listBlogs.items;
      
      // Filter blogs by the current user
      const filteredBlogs = allBlogs.filter(blog => blog.owner === user.username);
      
      // Sort blogs by creation date (newest first)
      const sortedBlogs = filteredBlogs.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setUserBlogs(sortedBlogs);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;
  if (!user) return <div>User not found</div>;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage image={user.attributes?.picture} />
        <ProfileInfo>
          <ProfileName>{user.attributes?.name || user.username}</ProfileName>
          <ProfileEmail>{user.attributes?.email}</ProfileEmail>
          <ProfileBio>
            {user.attributes?.bio || 'No bio available. Update your profile to add a bio.'}
          </ProfileBio>
        </ProfileInfo>
      </ProfileHeader>
      
      <BlogSection>
        <SectionTitle>My Blogs</SectionTitle>
        
        {userBlogs.length === 0 ? (
          <EmptyState>
            <h3>You haven't written any blogs yet</h3>
            <p>Start sharing your thoughts with the world!</p>
          </EmptyState>
        ) : (
          <BlogGrid>
            {userBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </BlogGrid>
        )}
      </BlogSection>
    </ProfileContainer>
  );
}

export default ProfilePage;
