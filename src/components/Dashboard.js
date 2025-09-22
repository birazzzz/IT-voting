import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useVote } from './VoteContext';

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
    overflow: auto;
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
  justify-content: flex-start;
  background: #edeae7;
  padding: 16px;
  padding-top: 40px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  padding: 20px 0;
`;

const Title = styled.h1`
  color: #222222;
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #666666;
  font-size: 1.2rem;
  margin: 0;
  max-width: 600px;
`;

const TotalTokens = styled.div`
  background: var(--accent-color);
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: var(--spacing-md);
  text-align: center;
  width: 100%;
  box-shadow: var(--shadow-md);
`;

const DashboardCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 2px solid #dedede;
  padding: 24px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const VotersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const TableHead = styled.thead`
  background: #f5f5f5;
`;

const TableHeader = styled.th`
  padding: 16px;
  color: #222222;
  font-weight: 600;
  border-bottom: 2px solid #dedede;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #fafafa;
  }
  
  &:hover {
    background: #f0f0f0;
  }
`;

const TableCell = styled.td`
  padding: 16px;
  color: #222222;
  border-bottom: 1px solid #dedede;
`;

const RankCell = styled.td`
  padding: 16px;
  color: #222222;
  border-bottom: 1px solid #dedede;
  font-size: 2rem;
  text-align: center;
  background: transparent;
`;

const ActionCell = styled.td`
  padding: 16px;
  color: #222222;
  border-bottom: 1px solid #dedede;
  text-align: center;
`;

const ActionButton = styled.button`
  background: ${props => props.delete ? '#ff6b6b' : '#81EDFF'};
  color: #222222;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 4px;

  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const ExportButton = styled.button`
  background: #81EDFF;
  color: #222222;
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #6bd8e6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const EraseButton = styled.button`
  background: #ff6b6b;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const BackButton = styled.button`
  background: transparent;
  color: #666666;
  border: 1px solid #dedede;
  border-radius: 999px;
  padding: 8px 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #f5f5f5;
    border-color: #81EDFF;
  }
`;

function Dashboard() {
  const navigate = useNavigate();
  const { getTotalVotes, getVoters, resetVotes } = useVote();
  const [voters, setVoters] = useState([]);

  // Fetch voter data
  useEffect(() => {
    const voterData = getVoters();
    setVoters(voterData);
  }, [getVoters]);

  const getRankEmoji = (index) => {
    switch(index + 1) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return index + 1;
    }
  };

  const handleDelete = (tokenId) => {
    if (window.confirm(`Are you sure you want to delete token ${tokenId}?`)) {
      // In a real Netlify Forms implementation, this would make an API call to delete the token
      // Example: await fetch(`/api/votes/${tokenId}`, { method: 'DELETE' });
      alert(`Token ${tokenId} would be deleted in a real Netlify Forms implementation`);
    }
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ['Rank', 'Token ID', 'Recipient Name', 'Email Address', 'Awarded To', 'Award Time'];
    const csvContent = [
      headers.join(','),
      ...voters.map((voter, index) => [
        index + 1,
        voter.id,
        `"${voter.name}"`,
        voter.email,
        `"${Array.isArray(voter.candidateNames) ? voter.candidateNames.join(', ') : voter.candidateName}"`,
        voter.voteTime
      ].join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'impact_tokens.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEraseAll = () => {
    if (window.confirm('Are you sure you want to erase all data? This action cannot be undone.')) {
      // Reset all votes to zero
      resetVotes();
      // In a real Netlify Forms implementation, this would also clear the form data
      alert('All data has been reset to zero in a real implementation');
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <ContentWrapper>
          <Title>Impact Token Dashboard</Title>
          <Subtitle>List of all awarded Impact Tokens</Subtitle>
          
          <TotalTokens>
            Total Impact Tokens Awarded: {getTotalVotes()}
          </TotalTokens>
          
          <ButtonGroup>
            <ExportButton onClick={handleExportCSV}>
              <span className="material-symbols-outlined">download</span>
              Export to CSV
            </ExportButton>
            <EraseButton onClick={handleEraseAll}>
              <span className="material-symbols-outlined">delete</span>
              Erase All Data
            </EraseButton>
          </ButtonGroup>
          
          <DashboardCard>
            <VotersTable>
              <TableHead>
                <tr>
                  <TableHeader>Rank</TableHeader>
                  <TableHeader>Token ID</TableHeader>
                  <TableHeader>Recipient Name</TableHeader>
                  <TableHeader>Email Address</TableHeader>
                  <TableHeader>Awarded To</TableHeader>
                  <TableHeader>Award Time</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </TableHead>
              <tbody>
                {voters.length > 0 ? (
                  voters.map((voter, index) => (
                    <TableRow key={index}>
                      <RankCell>{getRankEmoji(index)}</RankCell>
                      <TableCell>{voter.id}</TableCell>
                      <TableCell>{voter.name}</TableCell>
                      <TableCell>{voter.email}</TableCell>
                      <TableCell>
                        {Array.isArray(voter.candidateNames) 
                          ? voter.candidateNames.join(', ') 
                          : voter.candidateName}
                      </TableCell>
                      <TableCell>{voter.voteTime}</TableCell>
                      <ActionCell>
                        <ActionButton delete onClick={() => handleDelete(voter.id)}>
                          <span className="material-symbols-outlined">delete</span>
                        </ActionButton>
                      </ActionCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="7" style={{ textAlign: 'center' }}>
                      No votes have been recorded yet. Be the first to vote!
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </VotersTable>
          </DashboardCard>
          
          <BackButton onClick={() => navigate('/')}>
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </BackButton>
        </ContentWrapper>
      </PageContainer>
    </>
  );
}

export default Dashboard;