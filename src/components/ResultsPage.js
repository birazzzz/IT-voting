import React from 'react';
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
  max-width: 800px;
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

const LeaderboardCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 2px solid #dedede;
  padding: 24px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background: ${props => props.rank === 1 ? 'rgba(129, 237, 255, 0.2)' : 'transparent'};
  border: ${props => props.rank === 1 ? '1px solid #81EDFF' : '1px solid #dedede'};
  transition: all 0.2s ease;
`;

const RankBadge = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 16px;
  font-size: 2rem;
  background: transparent;
  border: none;
  border-radius: 0;
`;

const CandidateInfo = styled.div`
  flex: 1;
  text-align: left;
`;

const CandidateName = styled.h3`
  color: #222222;
  font-size: 1.2rem;
  margin: 0 0 4px 0;
  font-weight: 600;
`;

const CandidatePosition = styled.p`
  color: #666666;
  font-size: 0.9rem;
  margin: 0;
`;

const VoteCount = styled.div`
  font-weight: 700;
  color: #222222;
  font-size: 1.2rem;
`;

const VotePercentage = styled.div`
  width: 100px;
  height: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-top: 8px;
  overflow: hidden;
`;

const PercentageFill = styled.div`
  height: 100%;
  background: #81EDFF;
  width: ${props => props.percentage}%;
  border-radius: 4px;
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

function ResultsPage() {
  const navigate = useNavigate();

  // Sample results data (in a real app, this would come from an API)
  const results = [
    { id: 1, name: "Alex Johnson", position: "Team Lead", votes: 142, percentage: 35 },
    { id: 2, name: "Maria Garcia", position: "Design Director", votes: 118, percentage: 29 },
    { id: 3, name: "James Wilson", position: "Tech Lead", votes: 96, percentage: 24 },
    { id: 4, name: "Sarah Chen", position: "Product Manager", votes: 32, percentage: 8 },
    { id: 5, name: "David Brown", position: "Marketing Head", votes: 12, percentage: 4 }
  ];

  const getRankEmoji = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return rank;
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>Impact Token Leaderboard</Title>
        <Subtitle>Leaderboard of awarded Impact Tokens</Subtitle>
        
        <LeaderboardCard>
          <LeaderboardList>
            {results.map((candidate, index) => (
              <LeaderboardItem key={candidate.id} rank={index + 1}>
                <RankBadge rank={index + 1}>{getRankEmoji(index + 1)}</RankBadge>
                <CandidateInfo>
                  <CandidateName>{candidate.name}</CandidateName>
                  <CandidatePosition>{candidate.position}</CandidatePosition>
                  <VotePercentage>
                    <PercentageFill percentage={candidate.percentage} />
                  </VotePercentage>
                </CandidateInfo>
                <VoteCount>{candidate.votes} IT</VoteCount>
              </LeaderboardItem>
            ))}
          </LeaderboardList>
        </LeaderboardCard>
        
        <BackButton onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </BackButton>
      </ContentWrapper>
    </PageContainer>
  );
}

export default ResultsPage;