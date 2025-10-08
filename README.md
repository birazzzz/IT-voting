# Impact Token (IT) Voting System

A modern, responsive voting platform for the Toshiba Greatness Games. Built with pure HTML, CSS, and JavaScript for maximum compatibility and performance.

## Features

- **Real-time Voting** - Cast votes for team members and projects
- **Admin Panel** - Dynamically manage candidates and projects
- **Live Leaderboard** - Real-time rankings with automatic updates
- **Netlify Forms** - Professional form handling and data collection
- **Responsive Design** - Works perfectly on all devices
- **Professional UI** - Clean, modern design system

## Pages

- **`/`** - Home page with QR code and navigation
- **`/voting.html`** - Main voting interface
- **`/leaderboard.html`** - Real-time rankings display
- **`/admin.html`** - Candidate management panel
- **`/thank-you.html`** - Success page after voting

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/birazzzz/IT-voting.git
cd IT-voting
```

2. Start the local server:
```bash
node server-local.js
```

3. Open `http://localhost:4000` in your browser

## Netlify Deployment
This project is configured for automatic deployment on Netlify:

1. **Connect Repository** - Link your GitHub repository to Netlify
2. **Auto-deploy** - Netlify will build and deploy automatically
3. **Forms Active** - Vote submissions will appear in your Netlify dashboard
4. **Live URL** - Your site will be available at `https://your-site.netlify.app`
5. **Dashboard:** `https://your-site.netlify.app/dashboard.html` - Analytics and voting activity overview

### Netlify Configuration

The `netlify.toml` file includes:
- Static site build settings
{{ ... }}
- Form configuration for vote submissions
- No build process required (pure static files)

## Usage

1. **Admin Management** - Use `/admin.html` to add/remove candidates
2. **Voting** - Users access `/voting.html` to cast votes
3. **Results** - View live rankings at `/leaderboard.html`
4. **Data Collection** - All submissions stored in Netlify Forms dashboard

## Technology Stack

- **Frontend**: Pure HTML, CSS, JavaScript
- **Backend**: Node.js (local development only)
- **Deployment**: Netlify (static hosting)
- **Forms**: Netlify Forms
- **Storage**: localStorage (client-side persistence)


```
├── index.html          # Home page
├── voting.html         # Voting interface
├── leaderboard.html    # Rankings display
├── dashboard.html          # Analytics dashboard *(new)*
├── admin.html              # Management panel
├── thank-you.html      # Success page
├── server-local.js         # Local development server *(renamed)*
├── netlify.toml            # Deployment configuration
├── _redirects          # URL routing
├── Toshiba-teka.png    # Logo image
{{ ... }}

For issues or questions, please check the GitHub repository or Netlify dashboard for form submissions.
