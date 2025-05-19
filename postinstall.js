import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';

// Get current module path
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define paths
const srcDir = resolve(__dirname, 'dist');
const targetDir = resolve(__dirname, '..', 'public', 'booking-calendar');

// Create target directory if it doesn't exist
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

// Copy files function
async function copyFiles() {
  try {
    // Copy CSS
    copyFileSync(
      join(srcDir, 'css', 'stsCalendar.min.css'),
      join(targetDir, 'stsCalendar.min.css')
    );
    
    // Copy JS
    copyFileSync(
      join(srcDir, 'js', 'stsCalendar.js'),
      join(targetDir, 'stsCalendar.js')
    );
    
    console.log('BookingCalendar files copied successfully!');
  } catch (err) {
    console.error('Error copying files:', err);
    process.exit(1);
  }
}

// Execute
copyFiles();