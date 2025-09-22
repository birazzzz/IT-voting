import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

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

// Import styles from our design system
const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--primary-bg);
  padding: var(--spacing-md);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  text-align: center;
  max-width: 800px;
  padding: var(--spacing-md);
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: var(--spacing-lg);
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin: 0;
  max-width: 600px;
`;

const QRCard = styled.div`
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-color);
  padding: var(--spacing-xl);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  box-shadow: var(--shadow-md);

  &:hover {
    transform: translateY(-4px);
    border-color: var(--hover-border);
    box-shadow: var(--shadow-lg);
  }
`;

const QRPlaceholder = styled.div`
  width: 300px;
  height: 300px;
  background: var(--icon-bg);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 96px;
  color: var(--text-secondary);
`;

const InstructionText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
`;

const NavButtons = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  flex-wrap: wrap;
  justify-content: center;
`;

const NavButton = styled.button`
  background: var(--accent-color);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-pill);
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);

  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

function HomePage() {
  const navigate = useNavigate();

  const handleQRClick = () => {
    navigate('/vote');
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <ContentWrapper>
          <Logo src={logo} alt="Impact Token Logo" />
          <Title>Impact Token Voting</Title>
          <Subtitle>Scan the QR code to award your Impact Token</Subtitle>
          <QRCard onClick={handleQRClick}>
            {/* In a real application, this would be an actual QR code */}
            <QRPlaceholder className="material-symbols-outlined">
              qr_code
            </QRPlaceholder>
            <InstructionText>Click to award token</InstructionText>
          </QRCard>
        </ContentWrapper>
      </PageContainer>
    </>
  );
}

export default HomePage;