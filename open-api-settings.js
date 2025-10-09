/**
 * Script to open Supabase API settings in default browser
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

console.log('🚀 Opening Supabase API Settings...');
console.log('Please make sure you\'ve selected your project in the dashboard first.');

// Open Supabase API settings
// Note: You'll need to replace 'your-project-ref' with your actual project reference
console.log('\n⚠️  IMPORTANT: Replace "your-project-ref" with your actual project reference');
console.log('You can find this in your project URL or settings page.');

openUrl('https://app.supabase.com/project/your-project-ref/settings/api');