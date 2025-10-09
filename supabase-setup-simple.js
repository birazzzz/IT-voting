/**
 * Simple Supabase Setup Script
 * This script will help you set up the required tables and RLS policies
 */

// First, let's install the required package
console.log('Installing @supabase/supabase-js...');
const { execSync } = require('child_process');

try {
  execSync('npm install @supabase/supabase-js', { stdio: 'inherit' });
} catch (error) {
  console.log('Failed to install @supabase/supabase-js. Please install it manually with: npm install @supabase/supabase-js');
  process.exit(1);
}

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration - REPLACE THESE WITH YOUR ACTUAL CREDENTIALS
const SUPABASE_URL = 'https://ssrxybgexgntfdvkusyw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcnh5YmdleGdudGZkdmt1c3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NzYwMDEsImV4cCI6MjA3NTU1MjAwMX0._4WQ4uUE9ALjtZPSG11nouFA3MBftPgeCOf1trhoFlk';

console.log('Initializing Supabase client...');
const sbClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  console.log('Testing connection to Supabase...');
  try {
    const { data, error } = await sbClient.from('candidates').select('id').limit(1);
    
    if (error) {
      if (error.message.includes('not found') || error.message.includes('does not exist')) {
        console.log('Tables do not exist yet. This is expected.');
        return true;
      } else {
        console.log('Connection test result:', error.message);
        return true; // We can still try to create tables
      }
    }
    
    console.log('Connection successful!');
    return true;
  } catch (error) {
    console.error('Connection test failed:', error.message);
    return false;
  }
}

async function checkTables() {
  console.log('Checking if tables exist...');
  
  try {
    // Try to access candidates table
    const { data: candidatesData, error: candidatesError } = await sbClient.from('candidates').select('id').limit(1);
    
    if (candidatesError && (candidatesError.message.includes('not found') || candidatesError.message.includes('does not exist'))) {
      console.log('Candidates table does not exist');
      return false;
    }
    
    // Try to access votes table
    const { data: votesData, error: votesError } = await sbClient.from('votes').select('id').limit(1);
    
    if (votesError && (votesError.message.includes('not found') || votesError.message.includes('does not exist'))) {
      console.log('Votes table does not exist');
      return false;
    }
    
    console.log('Both tables exist');
    return true;
  } catch (error) {
    console.error('Error checking tables:', error.message);
    return false;
  }
}

async function createTables() {
  console.log('Creating tables...');
  
  // Note: We can't create tables directly with the anon key
  // This is just for demonstration - you'll need to create tables manually
  console.log(`
  ❗ IMPORTANT: You need to create the tables manually in Supabase dashboard:
  
  1. Go to your Supabase project dashboard
  2. Navigate to Table Editor
  3. Create a new table named "candidates" with these columns:
     - id (int8, primary key, auto-increment)
     - name (text, not null)
     - project (text, not null)
     - created_at (timestamptz, not null, default: now())
  
  4. Create another table named "votes" with these columns:
     - id (int8, primary key, auto-increment)
     - voter_name (text, not null)
     - voter_email (text, not null)
     - candidate_id (int8, not null)
     - candidate_name (text, not null)
     - candidate_project (text, not null)
     - vote_timestamp (timestamptz, not null, default: now())
  
  5. Enable Row Level Security (RLS) for both tables:
     - Click on each table
     - Go to "Policies" tab
     - Click "Enable RLS"
     - Create SELECT policies with USING expression: (true)
     - For votes table, also create INSERT policy with WITH CHECK expression: (true)
  `);
  
  return false;
}

async function main() {
  console.log('🚀 Starting Supabase setup helper...\n');
  
  const connectionSuccess = await testConnection();
  
  if (!connectionSuccess) {
    console.log('\n❌ Failed to connect to Supabase. Please check your credentials.');
    return;
  }
  
  const tablesExist = await checkTables();
  
  if (!tablesExist) {
    console.log('\n📋 Creating tables...');
    await createTables();
  } else {
    console.log('\n✅ Tables already exist');
  }
  
  console.log('\n📝 Next steps:');
  console.log('1. Follow the instructions above to create tables in Supabase dashboard');
  console.log('2. Open admin.html and click "Test Connection"');
  console.log('3. The "table not found" error should be resolved');
  console.log('4. You can then add candidates through the admin panel');
}

main();