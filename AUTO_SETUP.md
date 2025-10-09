# Automatic Supabase Setup Guide

This guide will help you automatically set up your Supabase project with the required tables and policies.

## Prerequisites

1. You have a Supabase account
2. You have created a Supabase project
3. You have the project URL and API keys

## Step 1: Get Your Service Role Key

1. Go to your Supabase project dashboard
2. Click on the gear icon (Settings) in the left sidebar
3. Click on "API" in the settings menu
4. Copy the "service_role" key (NOT the anon key)

## Step 2: Update the Setup Script

1. Open `supabase-setup-simple.js` in a text editor
2. Replace the placeholder service role key with your actual service role key:
   ```javascript
   const SUPABASE_SERVICE_ROLE_KEY = 'your-actual-service-role-key-here';
   ```

## Step 3: Run the Setup Script

```bash
node supabase-setup-simple.js
```

## Alternative: Manual Setup (Easier)

If you prefer to set up manually, follow these simple steps:

### 1. Create the Candidates Table

1. Go to your Supabase dashboard
2. Click on "Table Editor" in the left sidebar
3. Click "New Table"
4. Name it `candidates`
5. Add these columns:
   - `id` (int8, primary key, auto-increment)
   - `name` (text, not null)
   - `project` (text, not null)
   - `created_at` (timestamptz, not null, default: now())

### 2. Create the Votes Table

1. In the Table Editor, click "New Table"
2. Name it `votes`
3. Add these columns:
   - `id` (int8, primary key, auto-increment)
   - `voter_name` (text, not null)
   - `voter_email` (text, not null)
   - `candidate_id` (int8, not null)
   - `candidate_name` (text, not null)
   - `candidate_project` (text, not null)
   - `vote_timestamp` (timestamptz, not null, default: now())

### 3. Enable Row Level Security

#### For the Candidates Table:

1. Click on the `candidates` table
2. Go to the "Policies" tab
3. Click "Enable RLS"
4. Click "Create Policy"
5. Select "SELECT" as the operation
6. Name it "Allow read access"
7. In the "USING expression" field, enter `true`
8. Click "Save"

#### For the Votes Table:

1. Click on the `votes` table
2. Go to the "Policies" tab
3. Click "Enable RLS"
4. Click "Create Policy"
5. Select "SELECT" as the operation
6. Name it "Allow read access"
7. In the "USING expression" field, enter `true`
8. Click "Save"
9. Click "Create Policy" again
10. Select "INSERT" as the operation
11. Name it "Allow insert for everyone"
12. In the "WITH CHECK expression" field, enter `true`
13. Click "Save"

## Step 4: Test the Setup

1. Open `test-supabase.html` in your browser
2. Click "Test Connection" - it should succeed
3. Click "Test Select" - it should return an empty array
4. Open `admin.html` in your browser
5. Click "Test Connection" - it should succeed

## Troubleshooting

### "Permission denied" error

This means RLS policies aren't set up correctly:
1. Make sure you've enabled RLS for both tables
2. Make sure you've created SELECT policies with `true` as the USING expression
3. For the votes table, make sure you've created an INSERT policy with `true` as the WITH CHECK expression

### "Invalid API key" error

1. Make sure you're using the correct anon key from your Supabase dashboard
2. The key should start with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

### Still getting "table not found" error

1. Double-check that you've created both tables with the exact names (`candidates` and `votes`)
2. Make sure there are no typos in the table names
3. Check that you're using the correct Supabase project URL

## Need Help?

If you're still having issues:
1. Open `test-supabase.html` and click all three test buttons
2. Check the browser console (F12) for detailed error messages
3. Copy the error messages and ask for help