import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Curriculum from './components/Curriculum';
import Game from './components/Game';

interface RouterProps {
  toggleTheme: () => void;
}

const Router = ({ toggleTheme }: RouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
        <Route path="/curriculum" element={<Curriculum />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
