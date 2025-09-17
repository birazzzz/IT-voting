import React, { useState, useEffect } from 'react';
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
  justify-content: flex-start;
  background: var(--primary-bg);
  padding: var(--spacing-md);
  padding-top: 40px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  text-align: center;
  max-width: 1200px;
  width: 100%;
  padding: var(--spacing-md) 0;
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

const SectionCard = styled.div`
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-color);
  padding: var(--spacing-xl);
  width: 100%;
  box-shadow: var(--shadow-sm);
  text-align: left;
`;

const SectionTitle = styled.h2`
  color: var(--text-primary);
  margin-top: 0;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const Label = styled.label`
  color: var(--text-primary);
  font-weight: 600;
`;

const Input = styled.input`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  background: var(--card-bg);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const Button = styled.button`
  background: ${props => props.primary ? 'var(--accent-color)' : props.danger ? '#ff6b6b' : 'transparent'};
  color: ${props => props.danger ? '#ffffff' : 'var(--text-primary)'};
  border: 1px solid ${props => props.primary ? 'var(--accent-color)' : props.danger ? '#ff6b6b' : 'var(--border-color)'};
  border-radius: var(--radius-pill);
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  align-self: flex-start;

  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const CandidatesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
`;

const CandidateItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--icon-bg);
`;

const CandidateInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const CandidateName = styled.h3`
  color: var(--text-primary);
  margin: 0;
  font-size: 1.1rem;
`;

const CandidatePosition = styled.p`
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9rem;
`;

const VotersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-top: var(--spacing-md);
`;

const TableHead = styled.thead`
  background: var(--icon-bg);
`;

const TableHeader = styled.th`
  padding: var(--spacing-md);
  color: var(--text-primary);
  font-weight: 600;
  border-bottom: 2px solid var(--border-color);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: var(--card-bg);
  }
  
  &:hover {
    background: var(--accent-color);
  }
`;

const TableCell = styled.td`
  padding: var(--spacing-md);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
`;

const BackButton = styled.button`
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-pill);
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);

  &:hover {
    background: var(--icon-bg);
    border-color: var(--accent-color);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  align-items: center;
`;

const FilterLabel = styled.label`
  color: var(--text-primary);
  font-weight: 600;
  white-space: nowrap;
`;

const Select = styled.select`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  background: var(--card-bg);
  color: var(--text-primary);
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

function LodgePage() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({ name: '', position: '' });
  const [voters, setVoters] = useState([]);
  const [filter, setFilter] = useState('all');

  // In a real application, this data would come from an API
  useEffect(() => {
    // Mock data for demonstration
    const mockCandidates = [
      { id: 1, name: 'Alex Johnson', position: 'Team Lead' },
      { id: 2, name: 'Maria Garcia', position: 'Design Director' },
      { id: 3, name: 'James Wilson', position: 'Tech Lead' },
      { id: 4, name: 'Sarah Chen', position: 'Product Manager' },
      { id: 5, name: 'David Brown', position: 'Marketing Head' }
    ];
    
    const mockVoters = [
      { id: 'P001', name: 'John Smith', email: 'john@example.com', candidateId: 1, candidateName: 'Alex Johnson' },
      { id: 'P002', name: 'Emma Johnson', email: 'emma@example.com', candidateId: 2, candidateName: 'Maria Garcia' },
      { id: 'P003', name: 'Michael Brown', email: 'michael@example.com', candidateId: 1, candidateName: 'Alex Johnson' },
      { id: 'P004', name: 'Sarah Davis', email: 'sarah@example.com', candidateId: 3, candidateName: 'James Wilson' },
      { id: 'P005', name: 'Robert Wilson', email: 'robert@example.com', candidateId: 4, candidateName: 'Sarah Chen' }
    ];
    
    setCandidates(mockCandidates);
    setVoters(mockVoters);
  }, []);

  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (newCandidate.name && newCandidate.position) {
      const candidate = {
        id: candidates.length + 1,
        name: newCandidate.name,
        position: newCandidate.position
      };
      setCandidates([...candidates, candidate]);
      setNewCandidate({ name: '', position: '' });
    }
  };

  const handleRemoveCandidate = (id) => {
    if (window.confirm('Are you sure you want to remove this candidate?')) {
      setCandidates(candidates.filter(candidate => candidate.id !== id));
      // In a real application, you would also remove votes for this candidate
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <ContentWrapper>
          <Title>Impact Token Lodge</Title>
          <Subtitle>Manage candidates and view voting results</Subtitle>
          
          <SectionCard>
            <SectionTitle>Add New Candidate</SectionTitle>
            <Form onSubmit={handleAddCandidate}>
              <FormGroup>
                <Label htmlFor="candidateName">Candidate Name</Label>
                <Input
                  id="candidateName"
                  type="text"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                  placeholder="Enter candidate name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="candidatePosition">Position</Label>
                <Input
                  id="candidatePosition"
                  type="text"
                  value={newCandidate.position}
                  onChange={(e) => setNewCandidate({...newCandidate, position: e.target.value})}
                  placeholder="Enter candidate position"
                  required
                />
              </FormGroup>
              <Button primary type="submit">
                <span className="material-symbols-outlined">add</span>
                Add Candidate
              </Button>
            </Form>
          </SectionCard>
          
          <SectionCard>
            <SectionTitle>Current Candidates</SectionTitle>
            <CandidatesList>
              {candidates.map(candidate => (
                <CandidateItem key={candidate.id}>
                  <CandidateInfo>
                    <CandidateName>{candidate.name}</CandidateName>
                    <CandidatePosition>{candidate.position}</CandidatePosition>
                  </CandidateInfo>
                  <Button 
                    danger 
                    onClick={() => handleRemoveCandidate(candidate.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                    Remove
                  </Button>
                </CandidateItem>
              ))}
            </CandidatesList>
          </SectionCard>
          
          <SectionCard>
            <SectionTitle>Voter-Candidate Relationships</SectionTitle>
            <FilterContainer>
              <FilterLabel htmlFor="candidateFilter">Filter by candidate:</FilterLabel>
              <Select 
                id="candidateFilter" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Candidates</option>
                {candidates.map(candidate => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.name}
                  </option>
                ))}
              </Select>
            </FilterContainer>
            <VotersTable>
              <TableHead>
                <tr>
                  <TableHeader>Voter ID</TableHeader>
                  <TableHeader>Voter Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Awarded To</TableHeader>
                </tr>
              </TableHead>
              <tbody>
                {voters
                  .filter(voter => filter === 'all' || voter.candidateId === parseInt(filter))
                  .map(voter => (
                    <TableRow key={voter.id}>
                      <TableCell>{voter.id}</TableCell>
                      <TableCell>{voter.name}</TableCell>
                      <TableCell>{voter.email}</TableCell>
                      <TableCell>{voter.candidateName}</TableCell>
                    </TableRow>
                  ))}
              </tbody>
            </VotersTable>
          </SectionCard>
          
          <BackButton onClick={() => navigate('/')}>
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </BackButton>
        </ContentWrapper>
      </PageContainer>
    </>
  );
}

export default LodgePage;