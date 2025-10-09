# Supabase Setup Instructions

This document provides step-by-step instructions for setting up the required tables in Supabase for the Impact Token Voting application.

## Prerequisites

1. A Supabase account and project
2. The project URL and API keys from your Supabase dashboard

## Step 1: Create the Required Tables

### Create the "candidates" table:

1. Go to your Supabase project dashboard
2. Navigate to **Table Editor**
3. Click **New Table** and name it `candidates`
4. Add the following columns:

| Column Name | Data Type | Constraints | Default Value |
|-------------|-----------|-------------|---------------|
| id | int8 | Primary Key, Auto Increment |  |
| name | text | Not Null |  |
| project | text | Not Null |  |
| created_at | timestamptz | Not Null | now() |

### Create the "votes" table:

1. In the Table Editor, click **New Table** and name it `votes`
2. Add the following columns:

| Column Name | Data Type | Constraints | Default Value |
|-------------|-----------|-------------|---------------|
| id | int8 | Primary Key, Auto Increment |  |
| voter_name | text | Not Null |  |
| voter_email | text | Not Null |  |
| candidate_id | int8 | Not Null |  |
| candidate_name | text | Not Null |  |
| candidate_project | text | Not Null |  |
| vote_timestamp | timestamptz | Not Null | now() |

## Step 2: Configure Row Level Security (RLS)

Both tables need to have Row Level Security configured to allow read access for anonymous users.

### For the "candidates" table:

1. Click on the `candidates` table in the Table Editor
2. Go to the **Policies** tab
3. Click **Enable RLS**
4. Click **Create Policy**
5. Select **SELECT** as the operation
6. Give it a name like "Allow read access"
7. In the **USING expression** field, enter `true`
8. Click **Save**

### For the "votes" table:

1. Click on the `votes` table in the Table Editor
2. Go to the **Policies** tab
3. Click **Enable RLS**
4. Click **Create Policy**
5. Select **SELECT** as the operation
6. Give it a name like "Allow read access"
7. In the **USING expression** field, enter `true`
8. Click **Save**

If you want to allow anonymous users to submit votes, you'll also need to create an INSERT policy for the votes table:

1. Click **Create Policy**
2. Select **INSERT** as the operation
3. Give it a name like "Allow insert for everyone"
4. In the **WITH CHECK expression** field, enter `true`
5. Click **Save**

## Step 3: Update Application Configuration

Make sure your application is using the correct Supabase credentials:

- **Supabase URL**: `https://ssrxybgexgntfdvkusyw.supabase.co`
- **Supabase Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcnh5YmdleGdudGZkdmt1c3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NzYwMDEsImV4cCI6MjA3NTU1MjAwMX0._4WQ4uUE9ALjtZPSG11nouFA3MBftPgeCOf1trhoFlk`

## Testing the Setup

After completing the above steps:

1. Open the `test-supabase.html` file in your browser
2. Click the "Test Connection" button - this should succeed
3. Click the "Test Select" button - this should return an empty array (no candidates yet)
4. You can now use the admin panel to add candidates

## Troubleshooting

### "Candidates table not found" error

This error occurs when:
1. The table doesn't exist
2. The table name is misspelled
3. The user doesn't have access to the table

**Solution**: Verify the table exists and is spelled correctly.

### "Permission denied" error

This error occurs when Row Level Security policies haven't been configured properly.

**Solution**: 
1. Make sure RLS is enabled for both tables
2. Create SELECT policies with `true` as the USING expression
3. For the votes table, also create an INSERT policy if you want anonymous users to submit votes

### "Invalid API key" error

This error occurs when the API key is incorrect or malformed.

**Solution**: Double-check that you're using the correct anon key from your Supabase dashboard.

## Additional Notes

- The application uses the anon key which has limited permissions
- For administrative operations, you might need to use the service role key
- All timestamps are stored in UTC
- The application expects the tables to be in the `public` schema