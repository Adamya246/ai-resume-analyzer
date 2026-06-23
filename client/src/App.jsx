import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import History from './pages/History';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Landing />} />
        <Route path="/analyze"     element={<Analyze />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/history"     element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
