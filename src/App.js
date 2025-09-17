import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';
import Dashboard from './components/Dashboard';
import LodgePage from './components/LodgePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vote" element={<VotingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lodge" element={<LodgePage />} />
      </Routes>
    </Router>
  );
}

export default App;