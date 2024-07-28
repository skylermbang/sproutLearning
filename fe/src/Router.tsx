import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

interface RouterProps {
  toggleTheme: () => void;
}

const Router: React.FC<RouterProps> = ({ toggleTheme }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
