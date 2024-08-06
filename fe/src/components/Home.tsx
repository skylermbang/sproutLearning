import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import About from './About';
import Game from './Game';
import Curriculum from './Curriculum';
import Landing from './Landing';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/about" element={<About />} />
          <Route path="/game" element={<Game />} />
          <Route path="/curriculum" element={<Curriculum />} />
        </Routes>
      </MainContent>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
