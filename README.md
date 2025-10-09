# Impact Token Voting System

A real-time voting system for awarding Impact Tokens to team members, with global leaderboard synchronization via Supabase.

## Features

- Real-time voting with up to 10 candidate selections
- Global leaderboard synchronized with Supabase
- Admin panel for managing candidates
- Dashboard for viewing voting analytics
- Responsive design for all devices

## Prerequisites

- A Supabase account and project
- Node.js (for development server)

## Setup Instructions

### 1. Supabase Setup

To set up your Supabase database, you have several options:

#### Option 1: Automated Setup (Recommended)
1. Run the setup guide: `open supabase-setup-guide.html` in your browser
2. Follow the step-by-step instructions

#### Option 2: Manual Setup
1. Create a Supabase project at https://app.supabase.com/
2. Create the required tables:
   - `candidates` table with columns: id, name, project, created_at
   - `votes` table with columns: id, voter_name, voter_email, candidate_id, candidate_name, candidate_project, vote_timestamp
3. Configure Row Level Security (RLS) policies for both tables

#### Option 3: Scripted Setup
1. Get your Supabase service role key from the dashboard
2. Update `supabase-setup-simple.js` with your credentials
3. Run: `node supabase-setup-simple.js`

### 2. Application Configuration

The application is already configured with your Supabase credentials:
- URL: `https://ssrxybgexgntfdvkusyw.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcnh5YmdleGdudGZkdmt1c3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NzYwMDEsImV4cCI6MjA3NTU1MjAwMX0._4WQ4uUE9ALjtZPSG11nouFA3MBftPgeCOf1trhoFlk`

### 3. Running the Application

1. Start a local server:
   ```bash
   npm start
   ```
   or
   ```bash
   python3 -m http.server 8000
   ```

2. Open your browser to http://localhost:3000

## File Structure

- `index.html` - Home page with QR code
- `voting.html` - Voting page with candidate selection
- `leaderboard.html` - Real-time leaderboard
- `admin.html` - Admin panel for managing candidates
- `dashboard.html` - Voting analytics dashboard
- `thank-you.html` - Thank you page (redirect target)

## Supabase Tables

### candidates
- `id` (int8, primary key)
- `name` (text)
- `project` (text)
- `created_at` (timestamptz)

### votes
- `id` (int8, primary key)
- `voter_name` (text)
- `voter_email` (text)
- `candidate_id` (int8)
- `candidate_name` (text)
- `candidate_project` (text)
- `vote_timestamp` (timestamptz)

## Troubleshooting

### "Candidates table not found" error
This usually indicates a Row Level Security (RLS) configuration issue:
1. Ensure RLS is enabled for both tables
2. Create SELECT policies with `true` as the USING expression
3. For votes table, also create INSERT policy with `true` as the WITH CHECK expression

### "Permission denied" error
Check your RLS policies as described above.

### Testing Connection
Use `test-supabase.html` to verify your Supabase connection and configuration.

## Helper Scripts

- `supabase-setup-guide.html` - Step-by-step setup guide with direct links
- `test-supabase.html` - Connection and functionality testing
- `open-supabase-dashboard.js` - Opens Supabase dashboard in your browser
- `SUPABASE_SETUP.md` - Detailed setup instructions
- `AUTO_SETUP.md` - Automated setup guide

## Development

To modify the application:
1. Edit the HTML files directly
2. The Supabase client is loaded via CDN
3. All JavaScript is embedded in the HTML files

## Deployment

The application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Traditional web servers