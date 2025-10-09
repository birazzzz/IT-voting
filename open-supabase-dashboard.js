/**
 * Script to open Supabase dashboard in default browser
 */

const { exec } = require('child_process');
const os = require('os');

function openUrl(url) {
  const platform = os.platform();
  
  let command;
  switch (platform) {
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
      console.log(`Please open this URL in your browser: ${url}`);
      return;
  }
  
  exec(command, (error) => {
    if (error) {
      console.log(`Please open this URL in your browser: ${url}`);
    } else {
      console.log(`Opened ${url} in your default browser`);
    }
  });
}

console.log('🚀 Opening Supabase Dashboard...');
console.log('Please log in to your Supabase account if prompted.');

// Open Supabase dashboard
openUrl('https://app.supabase.com/');

// Also open the project settings API page
setTimeout(() => {
  console.log('\n📋 Next, we\'ll open the API settings page where you can get your keys.');
  console.log('Please select your project first in the dashboard, then run:');
  console.log('node open-api-settings.js');
}, 3000);