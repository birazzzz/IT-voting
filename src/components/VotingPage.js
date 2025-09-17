import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

// Add new styled components for checkbox list
const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--icon-bg);
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: var(--accent-color);
`;

const CandidateInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CandidateName = styled.span`
  font-weight: 600;
  color: var(--text-primary);
`;

const CandidatePosition = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const SelectionCounter = styled.div`
  text-align: right;
  font-size: 0.9rem;
  color: ${props => props.error ? '#ff6b6b' : 'var(--text-secondary)'};
  margin-top: var(--spacing-xs);
`;

function VotingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    candidates: [] // Changed from single candidate to array
  });

  // Sample candidates data
  const candidates = [
    { id: 1, name: "Alex Johnson", position: "Team Lead" },
    { id: 2, name: "Maria Garcia", position: "Design Director" },
    { id: 3, name: "James Wilson", position: "Tech Lead" },
    { id: 4, name: "Sarah Chen", position: "Product Manager" },
    { id: 5, name: "David Brown", position: "Marketing Head" }
  ];

  const MAX_SELECTIONS = 5;

  const generateVoterId = () => {
    // In a real application, this would be generated on the server
    // For demo purposes, we'll generate a simple ID
    return 'P' + Math.floor(1000 + Math.random() * 9000);
  };

  const handleCandidateChange = (candidateId) => {
    setFormData(prev => {
      const currentSelections = prev.candidates;
      let newSelections;
      
      if (currentSelections.includes(candidateId)) {
        // Remove candidate if already selected
        newSelections = currentSelections.filter(id => id !== candidateId);
      } else {
        // Add candidate if not selected and under limit
        if (currentSelections.length < MAX_SELECTIONS) {
          newSelections = [...currentSelections, candidateId];
        } else {
          // If at limit, don't add new selection
          alert(`You can select up to ${MAX_SELECTIONS} candidates only.`);
          return prev;
        }
      }
      
      return {
        ...prev,
        candidates: newSelections
      };
    });
  };

  const handleVote = (e) => {
    e.preventDefault();
    
    if (formData.name && formData.email && formData.candidates.length > 0) {
      // Generate a voter ID
      const voterId = generateVoterId();
      
      // Get selected candidate names for display
      const selectedCandidates = candidates.filter(c => formData.candidates.includes(c.id));
      
      // In a real application with Netlify Forms, the form would be submitted
      // and Netlify would handle the data storage
      console.log('Vote submitted:', { 
        voterId, 
        voterName: formData.name, 
        voterEmail: formData.email, 
        selectedCandidates: selectedCandidates.map(c => `${c.name} - ${c.position}`)
      });
      
      // Show confirmation and redirect to results
      alert(`Thank you ${formData.name} (ID: ${voterId}) for awarding your Impact Token to ${selectedCandidates.length} candidate(s)!`);
      navigate('/results');
    } else {
      alert('Please fill in all fields and select at least one candidate');
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <ContentWrapper>
          <Title>Award Impact Token</Title>
          <Subtitle>Please provide your information and select up to 5 candidates to award your Impact Token</Subtitle>
          
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
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Select Candidates (up to 5)</Label>
                <CheckboxGroup>
                  {candidates.map(candidate => (
                    <CheckboxLabel key={candidate.id}>
                      <Checkbox
                        type="checkbox"
                        id={`candidate-${candidate.id}`}
                        name="candidates"
                        value={candidate.id}
                        checked={formData.candidates.includes(candidate.id)}
                        onChange={() => handleCandidateChange(candidate.id)}
                      />
                      <CandidateInfo>
                        <CandidateName>{candidate.name}</CandidateName>
                        <CandidatePosition>{candidate.position}</CandidatePosition>
                      </CandidateInfo>
                    </CheckboxLabel>
                  ))}
                </CheckboxGroup>
                <SelectionCounter error={formData.candidates.length >= MAX_SELECTIONS}>
                  {formData.candidates.length} of {MAX_SELECTIONS} selected
                  {formData.candidates.length >= MAX_SELECTIONS && " (Maximum reached)"}
                </SelectionCounter>
                
                {/* Hidden inputs for each selected candidate to work with Netlify Forms */}
                {formData.candidates.map(candidateId => {
                  const candidate = candidates.find(c => c.id === candidateId);
                  return (
                    <input 
                      key={candidateId}
                      type="hidden" 
                      name="candidates" 
                      value={`${candidate.name} - ${candidate.position}`} 
                    />
                  );
                })}
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
    </>
  );
}

export default VotingPage;