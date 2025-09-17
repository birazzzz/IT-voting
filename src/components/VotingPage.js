import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Import styles from our design system
const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #edeae7;
  padding: 16px;
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

const FormContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 2px solid #dedede;
  padding: 32px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  text-align: left;
`;

const Label = styled.label`
  color: #222222;
  font-size: 1rem;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #dedede;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #81EDFF;
    box-shadow: 0 0 0 2px rgba(129, 237, 255, 0.2);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #dedede;
  border-radius: 8px;
  font-size: 1rem;
  background: #ffffff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #81EDFF;
    box-shadow: 0 0 0 2px rgba(129, 237, 255, 0.2);
  }
`;

const VoteButton = styled.button`
  background: #81EDFF;
  color: #222222;
  border: none;
  border-radius: 999px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: center;

  &:hover {
    background: #6bd8e6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background: #dedede;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

function VotingPage() {
  const navigate = useNavigate();
  const [voterName, setVoterName] = useState('');
  const [voterEmail, setVoterEmail] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');

  // Sample candidates data
  const candidates = [
    { id: 1, name: "Alex Johnson", position: "Team Lead" },
    { id: 2, name: "Maria Garcia", position: "Design Director" },
    { id: 3, name: "James Wilson", position: "Tech Lead" },
    { id: 4, name: "Sarah Chen", position: "Product Manager" },
    { id: 5, name: "David Brown", position: "Marketing Head" }
  ];

  const generateVoterId = () => {
    // In a real application, this would be generated on the server
    // For demo purposes, we'll generate a simple ID
    return 'P' + Math.floor(1000 + Math.random() * 9000);
  };

  const handleVote = (e) => {
    e.preventDefault();
    
    if (voterName && voterEmail && selectedCandidate) {
      // Generate a voter ID
      const voterId = generateVoterId();
      
      // In a real application with Netlify Forms, the form would be submitted
      // and Netlify would handle the data storage
      console.log('Vote submitted:', { voterId, voterName, voterEmail, selectedCandidate });
      
      // Show confirmation and redirect to results
      alert(`Thank you ${voterName} (ID: ${voterId}) for awarding your Impact Token!`);
      navigate('/results');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>Award Impact Token</Title>
        <Subtitle>Please provide your information and select a candidate to award your Impact Token</Subtitle>
        
        <FormContainer>
          {/* Netlify Form */}
          <form 
            name="vote-form" 
            method="POST" 
            data-netlify="true" 
            data-netlify-honeypot="bot-field"
            onSubmit={handleVote}
          >
            {/* Hidden input for Netlify */}
            <input type="hidden" name="form-name" value="vote-form" />
            
            {/* Honeypot field for spam prevention */}
            <p hidden>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>
            
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={voterEmail}
                onChange={(e) => setVoterEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="candidate">Select Candidate</Label>
              <Select
                id="candidate"
                name="candidate"
                value={selectedCandidate}
                onChange={(e) => setSelectedCandidate(e.target.value)}
                required
              >
                <option value="">-- Select a candidate --</option>
                {candidates.map(candidate => (
                  <option key={candidate.id} value={`${candidate.name} - ${candidate.position}`}>
                    {candidate.name} - {candidate.position}
                  </option>
                ))}
              </Select>
            </FormGroup>
            
            {/* Hidden field for voter ID */}
            <input type="hidden" name="voterId" value={generateVoterId()} />
            
            {/* Hidden field for vote time */}
            <input type="hidden" name="voteTime" value={new Date().toISOString()} />
            
            <VoteButton type="submit">
              <span className="material-symbols-outlined">check</span>
              Award Impact Token
            </VoteButton>
          </form>
        </FormContainer>
        
        <BackButton onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </BackButton>
      </ContentWrapper>
    </PageContainer>
  );
}

export default VotingPage;