const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const PORT = 3000;
const VOTES_FILE = path.join(__dirname, 'votes.json');

// Initialize votes file if it doesn't exist
if (!fs.existsSync(VOTES_FILE)) {
    fs.writeFileSync(VOTES_FILE, JSON.stringify({ voters: {} }, null, 2));
}

// Helper function to get client IP
function getClientIp(req) {
    return req.headers['x-forwarded-for'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           (req.connection.socket ? req.connection.socket.remoteAddress : null);
}

// Helper function to get votes data
function getVotesData() {
    try {
        return JSON.parse(fs.readFileSync(VOTES_FILE, 'utf8'));
    } catch (e) {
        console.error('Error reading votes file:', e);
        return { voters: {} };
    }
}

// Helper function to save votes data
function saveVote(ip, voteData) {
    const data = getVotesData();
    data.voters[ip] = {
        timestamp: new Date().toISOString(),
        ...voteData
    };
    fs.writeFileSync(VOTES_FILE, JSON.stringify(data, null, 2));
}

// Check if IP has already voted
function hasVoted(ip) {
    const data = getVotesData();
    return !!data.voters[ip];
}

// Read the index.html file once at startup
// Read HTML files once at startup
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const alreadyVotedHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Already Voted</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Manrope', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
            text-align: center;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .emoji {
            font-size: 50px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="emoji">✅</div>
        <h1>Thank You for Voting!</h1>
        <p>You've already submitted your vote. Each person can only vote once.</p>
        <p>Check out the <a href="/leaderboard.html">leaderboard</a> to see the current results.</p>
    </div>
</body>
const server = http.createServer((req, res) => {
  const url = req.url;
  const clientIp = getClientIp(req);

  // Handle form submission
  if (req.method === 'POST' && url === '/') {
    const clientIp = getClientIp(req);
    
    // Prevent multiple votes
    if (hasVoted(clientIp)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('You have already voted.');
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const formData = parse(body);
        saveVote(clientIp, formData);
        
        // Redirect to thank you page
        res.writeHead(302, { 'Location': '/thank-you.html' });
        res.end();
      } catch (error) {
        console.error('Error processing vote:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error processing your vote. Please try again.');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(leaderboardHtml);
    return;
  }

  // Handle admin page
  if (url === '/admin.html') {
    const adminHtml = fs.readFileSync(path.join(__dirname, 'admin.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(adminHtml);
    return;
  }

  // Handle thank you page
  if (url === '/thank-you.html') {
    const thankYouHtml = fs.readFileSync(path.join(__dirname, 'thank-you.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(thankYouHtml);
    return;
  }

  // Handle other static files (images, etc.)
  const filePath = path.join(__dirname, url);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml'
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  } else {
    // 404 for non-existent files
    res.writeHead(404);
    res.end('File not found');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Impact Token Voting Server running at http://localhost:${PORT}`);
  console.log('');
  console.log('📱 Available pages:');
  console.log(`   Home:       http://localhost:${PORT}`);
  console.log(`   Voting:     http://localhost:${PORT}/voting.html`);
  console.log(`   Leaderboard: http://localhost:${PORT}/leaderboard.html`);
  console.log(`   Admin:      http://localhost:${PORT}/admin.html`);
  console.log(`   Thank You:  http://localhost:${PORT}/thank-you.html`);
  console.log(`   Dashboard:  http://localhost:${PORT}/dashboard.html`);
  console.log('');
  console.log('🚀 Netlify Form Ready:');
  console.log('   - Form submissions will be sent to Netlify');
  console.log('   - Check your Netlify dashboard for form responses');
  console.log('   - Deploy with: netlify.toml and _redirects files included');
  console.log('');
  console.log('💡 Complete flow:');
  console.log('   1. Admin → Manage candidates (add/remove)');
  console.log('   2. Home → Click "Tap to Vote"');
  console.log('   3. Fill form → Select candidates → Click "Give Impact Token"');
  console.log('   4. Form data sent to Netlify + localStorage updated');
  console.log('   5. Auto-redirect to leaderboard: http://localhost:3000/leaderboard.html');
  console.log('   6. View live rankings → Vote again if needed');
});
