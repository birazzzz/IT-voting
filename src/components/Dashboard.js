import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const InfoBox = styled.div`
  background: #f8f8f8;
  border-radius: 16px;
  border: 2px solid #dedede;
  padding: 24px;
  width: 100%;
  text-align: left;
  margin-bottom: 24px;
`;

const InfoTitle = styled.h3`
  color: #222222;
  margin-top: 0;
`;

const InfoList = styled.ul`
  color: #666666;
  line-height: 1.6;
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
  const [voters, setVoters] = useState([]);

  // In a real application, this data would come from Netlify Forms API
  // For demonstration, we'll use mock data
  useEffect(() => {
    // Mock data for demonstration
    const mockVoters = [
      { id: 'P001', name: 'John Smith', email: 'john@example.com', candidate: 'Alex Johnson - Team Lead', voteTime: '2023-05-15 14:30:22' },
      { id: 'P002', name: 'Emma Johnson', email: 'emma@example.com', candidate: 'Maria Garcia - Design Director', voteTime: '2023-05-15 15:45:17' },
      { id: 'P003', name: 'Michael Brown', email: 'michael@example.com', candidate: 'James Wilson - Tech Lead', voteTime: '2023-05-15 16:22:05' },
      { id: 'P004', name: 'Sarah Davis', email: 'sarah@example.com', candidate: 'Sarah Chen - Product Manager', voteTime: '2023-05-15 17:10:44' },
      { id: 'P005', name: 'Robert Wilson', email: 'robert@example.com', candidate: 'David Brown - Marketing Head', voteTime: '2023-05-15 18:05:33' }
    ];
    
    setVoters(mockVoters);
  }, []);

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
      // In a real application, this would make an API call to delete the token
      alert(`Token ${tokenId} would be deleted in a real application`);
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
        `"${voter.candidate}"`,
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
      // In a real application, this would make an API call to delete all tokens
      alert('All data would be erased in a real application');
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>Impact Token Dashboard</Title>
        <Subtitle>List of all awarded Impact Tokens</Subtitle>
        
        <InfoBox>
          <InfoTitle>Netlify Forms Integration</InfoTitle>
          <InfoList>
            <li>All Impact Token awards are automatically collected by Netlify Forms</li>
            <li>To access real token data, go to your Netlify dashboard → Forms → "vote-form"</li>
            <li>This dashboard shows mock data for demonstration purposes</li>
            <li>In a production environment, you would fetch data from Netlify Forms API</li>
          </InfoList>
        </InfoBox>
        
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
              {voters.map((voter, index) => (
                <TableRow key={index}>
                  <RankCell>{getRankEmoji(index)}</RankCell>
                  <TableCell>{voter.id}</TableCell>
                  <TableCell>{voter.name}</TableCell>
                  <TableCell>{voter.email}</TableCell>
                  <TableCell>{voter.candidate}</TableCell>
                  <TableCell>{voter.voteTime}</TableCell>
                  <ActionCell>
                    <ActionButton delete onClick={() => handleDelete(voter.id)}>
                      <span className="material-symbols-outlined">delete</span>
                    </ActionButton>
                  </ActionCell>
                </TableRow>
              ))}
            </tbody>
          </VotersTable>
        </DashboardCard>
        
        <BackButton onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </BackButton>
      </ContentWrapper>
    </PageContainer>
  );
}

export default Dashboard;