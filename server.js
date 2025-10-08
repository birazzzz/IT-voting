const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;

// Read the index.html file once at startup
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const server = http.createServer((req, res) => {
  const url = req.url;

  // Handle root path
  if (url === '/' || url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
    return;
  }

  // Handle leaderboard page
  if (url === '/leaderboard.html') {
    const leaderboardHtml = fs.readFileSync(path.join(__dirname, 'leaderboard.html'), 'utf8');
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
  console.log('   5. Auto-redirect to leaderboard: http://localhost:4000/leaderboard.html');
  console.log('   6. View live rankings → Vote again if needed');
});
