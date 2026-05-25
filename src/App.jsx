import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Dashboard21Days from './Dashboard21Days';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bono-5" element={<Dashboard21Days />} />
    </Routes>
  );
}

export default App;
