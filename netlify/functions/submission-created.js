const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
    // 1. Initialize Supabase Client
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SECRET_KEY 
    );

    const formData = JSON.parse(event.body).payload.data;

    // 2. Extract voter information
    const voterName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
    const voterEmail = formData.email || null;
    
    // 3. Process candidate data (multiple candidates can be selected)
    const votes = [];
    
    // Check how many candidates were selected
    const totalCandidates = parseInt(formData.totalCandidates) || 0;
    
    for (let i = 0; i < totalCandidates; i++) {
        const candidateId = formData[`candidate_${i}_id`];
        const candidateName = formData[`candidate_${i}_name`];
        const candidateProject = formData[`candidate_${i}_project`];
        
        if (candidateId && candidateName) {
            votes.push({
                voter_name: voterName || 'Anonymous',
                voter_email: voterEmail,
                candidate_id: parseInt(candidateId),
                candidate_name: candidateName,
                candidate_project: candidateProject || 'N/A',
                vote_timestamp: new Date().toISOString()
            });
        }
    }

    // If no votes were extracted, create at least one with available data
    if (votes.length === 0) {
        votes.push({
            voter_name: voterName || 'Anonymous',
            voter_email: voterEmail,
            candidate_id: null,
            candidate_name: 'Unknown',
            candidate_project: 'N/A',
            vote_timestamp: new Date().toISOString()
        });
    }

    try {
        // 4. Insert all votes into the 'votes' table
        const { error } = await supabase
            .from('votes')
            .insert(votes);

        if (error) {
            console.error('Supabase Error:', error);
            return { statusCode: 500, body: JSON.stringify({ error: 'Failed to record vote.' }) };
        }
        return { statusCode: 200, body: JSON.stringify({ message: 'Votes recorded successfully.' }) };
    } catch (err) {
        console.error('Server Error:', err);
        return { statusCode: 500, body: JSON.stringify({ error: 'Server error.' }) };
    }
};