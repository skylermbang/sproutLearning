import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Curriculum from './components/Curriculum';
import Game from './components/Game';
import Signup from './components/Signup';
import Profile from './components/Profile';

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
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
