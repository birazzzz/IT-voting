const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
    // 1. Check if environment variables are set
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
        console.error('Supabase environment variables not set');
        return { statusCode: 500, body: JSON.stringify({ error: 'Supabase configuration missing.' }) };
    }

    // 2. Initialize Supabase Client
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SECRET_KEY 
    );

    try {
        const formData = JSON.parse(event.body).payload.data;
        console.log('Form data received:', formData);

        // 3. Extract voter information
        const voterName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Anonymous';
        const voterEmail = formData.email || null;
        
        // 4. Process candidate data (multiple candidates can be selected)
        const votes = [];
        
        // Check how many candidates were selected
        const totalCandidates = parseInt(formData.totalCandidates) || 0;
        
        for (let i = 0; i < totalCandidates; i++) {
            const candidateId = formData[`candidate_${i}_id`];
            const candidateName = formData[`candidate_${i}_name`];
            const candidateProject = formData[`candidate_${i}_project`];
            
            if (candidateId && candidateName) {
                votes.push({
                    voter_name: voterName,
                    voter_email: voterEmail,
                    candidate_id: parseInt(candidateId),
                    candidate_name: candidateName,
                    candidate_project: candidateProject || 'N/A',
                    vote_timestamp: new Date().toISOString()
                });
            }
        }

        // If no votes were extracted, log the issue
        if (votes.length === 0) {
            console.warn('No valid votes extracted from form data');
            return { statusCode: 200, body: JSON.stringify({ message: 'No votes to record.' }) };
        }

        // 5. Insert all votes into the 'votes' table
        const { error } = await supabase
            .from('votes')
            .insert(votes);

        if (error) {
            console.error('Supabase Error:', error);
            return { statusCode: 500, body: JSON.stringify({ error: 'Failed to record vote.' }) };
        }
        
        console.log(`Successfully recorded ${votes.length} votes`);
        return { statusCode: 200, body: JSON.stringify({ message: `Successfully recorded ${votes.length} votes.` }) };
    } catch (err) {
        console.error('Server Error:', err);
        return { statusCode: 500, body: JSON.stringify({ error: 'Server error.' }) };
    }
};