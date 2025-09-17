import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

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
        <NavButtons>
          <NavButton onClick={() => navigate('/results')}>
            <span className="material-symbols-outlined">leaderboard</span>
            Results
          </NavButton>
          <NavButton onClick={() => navigate('/dashboard')}>
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </NavButton>
          <NavButton onClick={() => navigate('/lodge')}>
            <span className="material-symbols-outlined">group</span>
            Lodge
          </NavButton>
        </NavButtons>
      </ContentWrapper>
    </PageContainer>
  );
}

export default HomePage;