/**
 * Supabase Initialization Script
 * This script provides an easy way to get started with the Supabase setup
 */

const { exec } = require('child_process');
const { platform } = require('os');
const { writeFileSync, existsSync } = require('fs');

console.log('🚀 Initializing Supabase Setup...\n');

// Function to open URL in browser
function openUrl(url) {
  let command;
  switch (platform()) {
    case 'darwin': // macOS
      command = `open "${url}"`;
      break;
    case 'win32': // Windows
      command = `start "" "${url}"`;
      break;
    case 'linux': // Linux
      command = `xdg-open "${url}"`;
      break;
    default:
      console.log(`📋 Please open this URL in your browser: ${url}\n`);
      return Promise.resolve();
  }
  
  return new Promise((resolve) => {
    exec(command, (error) => {
      if (error) {
        console.log(`📋 Please open this URL in your browser: ${url}\n`);
      } else {
        console.log(`✅ Opened ${url} in your default browser\n`);
      }
      resolve();
    });
  });
}

// Function to create .env file with Supabase credentials
function createEnvFile() {
  const envContent = `# Supabase Configuration
SUPABASE_URL=https://ssrxybgexgntfdvkusyw.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcnh5YmdleGdudGZkdmt1c3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NzYwMDEsImV4cCI6MjA3NTU1MjAwMX0._4WQ4uUE9ALjtZPSG11nouFA3MBftPgeCOf1trhoFlk
`;
  
  if (!existsSync('.env')) {
    writeFileSync('.env', envContent);
    console.log('✅ Created .env file with Supabase credentials\n');
  } else {
    console.log('ℹ️  .env file already exists\n');
  }
}

// Main initialization function
async function init() {
  console.log('Welcome to the Impact Token Voting System Setup!\n');
  
  // Create .env file
  createEnvFile();
  
  // Open setup guide
  console.log('📖 Opening setup guide...\n');
  await openUrl('file://' + process.cwd() + '/supabase-setup-guide.html');
  
  // Instructions
  console.log('📋 Setup Instructions:');
  console.log('1. Follow the setup guide in your browser');
  console.log('2. Create the required tables in your Supabase dashboard');
  console.log('3. Configure Row Level Security (RLS) policies');
  console.log('4. Test your setup with test-supabase.html');
  console.log('5. Start using the admin panel to add candidates\n');
  
  console.log('📂 Helpful Files:');
  console.log('- supabase-setup-guide.html: Step-by-step setup guide');
  console.log('- test-supabase.html: Connection testing tool');
  console.log('- SUPABASE_SETUP.md: Detailed setup instructions');
  console.log('- AUTO_SETUP.md: Automated setup guide\n');
  
  console.log('💡 Tips:');
  console.log('- Make sure to enable RLS on both tables');
  console.log('- Create SELECT policies with "true" as the USING expression');
  console.log('- For votes table, also create INSERT policy with "true" as WITH CHECK expression');
  console.log('- The "table not found" error usually means RLS is not configured correctly\n');
  
  console.log('🎉 Setup initialization complete!');
  console.log('Run "node open-supabase-dashboard.js" to open your Supabase dashboard\n');
}

// Run initialization
init().catch(console.error);