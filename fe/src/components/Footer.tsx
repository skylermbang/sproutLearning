import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      &copy; 2023 Sprout Learning. All rights reserved.
    </FooterContainer>
  );
}

export default Footer;
