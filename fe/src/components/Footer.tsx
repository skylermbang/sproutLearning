import React from 'react';
import styled from 'styled-components';
import logo3 from '../assets/logo3.png';

const FooterContainer = styled.footer`
  background-color: rgb(215, 214, 203);
  padding: 2rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
`;

const FooterSection = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LogoContainer = styled.div`
  flex: 1;
  text-align: left;
  margin-bottom: 1rem;

  img {
    max-width: 120px;
  }
`;

const LinksContainer = styled.div`
  flex: 1;
  text-align: left;

  h4 {
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        text-decoration: none;
        color: #080808;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const SocialMediaContainer = styled.div`
  flex: 1;
  text-align: left;

  h4 {
    margin-bottom: 0.5rem;
  }

  a {
    margin-right: 1rem;
    color: #080808;

    &:hover {
      color: #0056b3;
    }
  }
`;

const CopyrightContainer = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #666;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <LogoContainer>
          <img src={logo3} alt="Sprout Learning" />
        </LogoContainer>
        <LinksContainer>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </LinksContainer>
        <SocialMediaContainer>
          <h4>Follow Us</h4>
          <a href="https://facebook.com">Wechat</a>
          <a href="https://twitter.com">Weibo</a>
          <a href="https://linkedin.com">LinkedIn</a>
        </SocialMediaContainer>
      </FooterSection>
      <CopyrightContainer>
        &copy; 2023 Sprout Learning. All rights reserved.
      </CopyrightContainer>
    </FooterContainer>
  );
}

export default Footer;
