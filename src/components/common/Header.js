import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPen, FaUser, FaSignOutAlt } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #292929;
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  text-decoration: none;
  color: #292929;
  font-weight: 500;
  
  &:hover {
    color: #1a8917;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  background: none;
  border: none;
  color: #292929;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: #1a8917;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

function Header({ user, signOut }) {
  return (
    <HeaderContainer>
      <Logo>
        <Link to="/">AWSBlog</Link>
      </Logo>
      <Nav>
        <NavLink to="/create">
          <FaPen /> Write
        </NavLink>
        <NavLink to="/profile">
          <FaUser /> Profile
        </NavLink>
        <Button onClick={signOut}>
          <FaSignOutAlt /> Sign Out
        </Button>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
