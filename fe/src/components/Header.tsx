import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import logo3 from '../assets/logo3.png';
import useUser from '../hooks/useUser';

// Define the custom props for the StyledLink
interface StyledLinkProps {
  isActive: boolean;
}

const Logo = styled.img`
  height: 90px;
  margin-right: 1rem;
`;

const HeaderContainer = styled.header`
  background-color: rgb(215, 214, 203);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
`;

const StyledLink = styled(Link)<StyledLinkProps>`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  color: ${(props) => (props.isActive ? 'darkgreen' : 'black')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  const location = useLocation();
  const { data: user, isLoading, error } = useUser();
  // Conditional rendering based on user authentication status
  const isLoggedIn = !!user && !isLoading && !error;

  return (
    <HeaderContainer>
      <Logo src={logo3} alt="Sprout Learning" />
      <TabContainer>
        <StyledLink to="/" isActive={location.pathname === '/'}>Home</StyledLink>
        <StyledLink to="/about" isActive={location.pathname === '/about'}>About</StyledLink>
        <StyledLink to="/game" isActive={location.pathname === '/game'}>Game</StyledLink>
        <StyledLink to="/curriculum" isActive={location.pathname === '/curriculum'}>Curriculum</StyledLink>
        {isLoggedIn ? (
          <StyledLink to="/profile" isActive={location.pathname === '/profile'}>Profile</StyledLink>
        ) : (
          <>
            <StyledLink to="/signup" isActive={location.pathname === '/singup'}>Login/Join</StyledLink>
          </>
        )}
      </TabContainer>
    </HeaderContainer>
  );
};

export default Header;
