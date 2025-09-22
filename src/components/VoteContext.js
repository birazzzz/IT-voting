import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial candidates data
const initialCandidates = [
  { id: 1, name: "Alex Johnson", position: "Team Lead" },
  { id: 2, name: "Maria Garcia", position: "Design Director" },
  { id: 3, name: "James Wilson", position: "Tech Lead" },
  { id: 4, name: "Sarah Chen", position: "Product Manager" },
  { id: 5, name: "David Brown", position: "Marketing Head" }
];

// Action types
const VOTE_ACTION = 'VOTE';
const RESET_VOTES_ACTION = 'RESET_VOTES';
const LOAD_DATA_ACTION = 'LOAD_DATA';

// Reducer function
const voteReducer = (state, action) => {
  switch (action.type) {
    case VOTE_ACTION:
      // action.payload is an object with voterInfo and candidateIds
      const { voterInfo, candidateIds } = action.payload;
      const newVotes = { ...state.votes };
      const newVoters = [...state.voters, voterInfo];
      
      // Update vote counts
      candidateIds.forEach(candidateId => {
        newVotes[candidateId] = (newVotes[candidateId] || 0) + 1;
      });
      
      const newState = {
        ...state,
        votes: newVotes,
        voters: newVoters
      };
      
      // Save to localStorage to persist between sessions
      localStorage.setItem('votingAppData', JSON.stringify(newState));
      
      return newState;
      
    case RESET_VOTES_ACTION:
      // Reset all votes to zero and clear voters
      const resetVotes = initialCandidates.reduce((acc, candidate) => {
        acc[candidate.id] = 0;
        return acc;
      }, {});
      
      const resetState = {
        votes: resetVotes,
        voters: []
      };
      
      // Save reset state to localStorage
      localStorage.setItem('votingAppData', JSON.stringify(resetState));
      
      return resetState;
      
    case LOAD_DATA_ACTION:
      // Load data from localStorage
      return {
        ...state,
        votes: action.payload.votes || state.votes,
        voters: action.payload.voters || state.voters
      };
      
    default:
      return state;
  }
};

// Create context
const VoteContext = createContext();

// Provider component
export const VoteProvider = ({ children }) => {
  // Initialize state with empty votes and voters
  const initialState = {
    votes: initialCandidates.reduce((acc, candidate) => {
      acc[candidate.id] = 0;
      return acc;
    }, {}),
    voters: []
  };
  
  const [state, dispatch] = useReducer(voteReducer, initialState);
  
  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('votingAppData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: LOAD_DATA_ACTION, payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);
  
  const vote = (voterInfo, candidateIds) => {
    dispatch({ type: VOTE_ACTION, payload: { voterInfo, candidateIds } });
    // In a real Netlify Forms implementation, the form would be submitted to Netlify
    // and the data would be stored on Netlify's servers
  };
  
  const resetVotes = () => {
    dispatch({ type: RESET_VOTES_ACTION });
    // In a real Netlify Forms implementation, this would require manual clearing
    // of form submissions through the Netlify dashboard or API
  };
  
  const getCandidatesWithVotes = () => {
    return initialCandidates.map(candidate => ({
      ...candidate,
      votes: state.votes[candidate.id] || 0
    }));
  };
  
  const getSortedCandidatesWithVotes = () => {
    const candidatesWithVotes = getCandidatesWithVotes();
    return candidatesWithVotes.sort((a, b) => b.votes - a.votes);
  };
  
  const getTotalVotes = () => {
    return Object.values(state.votes).reduce((total, count) => total + count, 0);
  };
  
  const getVoters = () => {
    return state.voters;
  };
  
  const getVotersByCandidate = (candidateId) => {
    return state.voters.filter(voter => {
      if (Array.isArray(voter.candidateIds)) {
        return voter.candidateIds.includes(candidateId);
      }
      return voter.candidateId === candidateId;
    });
  };
  
  return (
    <VoteContext.Provider value={{ 
      votes: state.votes,
      voters: state.voters,
      vote, 
      resetVotes,
      getCandidatesWithVotes, 
      getSortedCandidatesWithVotes,
      getTotalVotes,
      getVoters,
      getVotersByCandidate,
      candidates: initialCandidates
    }}>
      {children}
    </VoteContext.Provider>
  );
};

// Custom hook to use the vote context
export const useVote = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVote must be used within a VoteProvider');
  }
  return context;
};