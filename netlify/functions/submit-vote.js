const { v4: uuidv4 } = require('uuid');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    try {
        const formData = JSON.parse(event.body);
        const ip = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'];
        
        // Here you would typically save the vote to a database
        // For now, we'll just log it and return success
        console.log('Received vote:', {
            ip,
            ...formData,
            timestamp: new Date().toISOString(),
            id: uuidv4()
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                redirect: '/thank-you.html',
                message: 'Vote submitted successfully!'
            })
        };
    } catch (error) {
        console.error('Error processing vote:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Error processing your vote. Please try again.'
            })
        };
    }
};
