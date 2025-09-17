import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';
import Dashboard from './components/Dashboard';
import LodgePage from './components/LodgePage';

// Global styles
const GlobalStyle = createGlobalStyle`
  :root {
    --primary-bg: #edeae7;
    --card-bg: #ffffff;
    --border-color: #dedede;
    --hover-border: #81EDFF;
    --text-primary: #222222;
    --text-secondary: #666666;
    --icon-bg: #f5f5f5;
    --accent-color: #81EDFF;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --shadow-hover: rgba(0, 0, 0, 0.1);
    --chart-color: #81EDFF;
    
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 40px;
    
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-pill: 999px;
    
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.1);
    
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    --transition-slow: 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  
  body {
    font-family: 'Manrope', sans-serif;
    background: var(--primary-bg);
    margin: 0;
    padding: 0;
    overflow: auto; /* Changed from hidden to auto */
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lodge" element={<LodgePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;