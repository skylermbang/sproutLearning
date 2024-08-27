import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

// Define keyframes for animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// Styled container for the page
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height of the viewport */
  background-color: #f0f0f0; /* Light background color */
  text-align: center;
  padding: 20px;
`;

// Styled message box
const MessageBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 2s ease-in-out;
  max-width: 600px;
  width: 80%;
`;

// Styled text
const MessageText = styled.h1`
  font-size: 2.5rem;
  color: darkgreen;
  margin: 0;
  animation: ${fadeIn} 2s ease-in-out infinite alternate; /* Fading effect */
`;

const Game = () => {
  return (
    <>
      <Header />
    <PageContainer>
    
      <MessageBox>
        <MessageText>Updating Soon...</MessageText>
      </MessageBox>
    
    </PageContainer>
    <Footer/>
</>
  );
};

export default Game;
