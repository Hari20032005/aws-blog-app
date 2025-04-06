import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShare, FaTwitter, FaFacebook, FaLinkedin, FaLink } from 'react-icons/fa';

const ShareButtonContainer = styled.div`
  position: relative;
`;

const ShareToggle = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #757575;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  svg {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

const ShareMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 10;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const ShareOption = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #292929;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

const CopyNotification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #292929;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

function ShareButton({ blogId, title }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const getShareUrl = () => {
    return `${window.location.origin}/blog/${blogId}`;
  };
  
  const handleTwitterShare = () => {
    const url = getShareUrl();
    const text = `Check out this blog: ${title}`;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    setIsMenuOpen(false);
  };
  
  const handleFacebookShare = () => {
    const url = getShareUrl();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    setIsMenuOpen(false);
  };
  
  const handleLinkedInShare = () => {
    const url = getShareUrl();
    const title = encodeURIComponent(title);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${title}`, '_blank');
    setIsMenuOpen(false);
  };
  
  const handleCopyLink = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      setShowCopyNotification(true);
      setTimeout(() => {
        setShowCopyNotification(false);
      }, 2000);
    });
    setIsMenuOpen(false);
  };
  
  return (
    <ShareButtonContainer>
      <ShareToggle onClick={toggleMenu}>
        <FaShare /> Share
      </ShareToggle>
      
      <ShareMenu $isOpen={isMenuOpen}>
        <ShareOption onClick={handleTwitterShare}>
          <FaTwitter /> Twitter
        </ShareOption>
        <ShareOption onClick={handleFacebookShare}>
          <FaFacebook /> Facebook
        </ShareOption>
        <ShareOption onClick={handleLinkedInShare}>
          <FaLinkedin /> LinkedIn
        </ShareOption>
        <ShareOption onClick={handleCopyLink}>
          <FaLink /> Copy Link
        </ShareOption>
      </ShareMenu>
      
      {showCopyNotification && (
        <CopyNotification>
          Link copied to clipboard!
        </CopyNotification>
      )}
    </ShareButtonContainer>
  );
}

export default ShareButton;
