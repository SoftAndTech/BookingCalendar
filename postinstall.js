import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source files from inside the package
const jsSource = path.join(__dirname, 'dist/js/stsCalendar.js');
const cssSource = path.join(__dirname, 'dist/css/stsCalendar.min.css');

// Destination paths in host project
const projectRoot = path.resolve(__dirname, '../../../../../'); // goes up from node_modules/@softandtech/booking-calendar
const destJsDir = path.join(projectRoot, 'public/js/softandtech');
const destCssDir = path.join(projectRoot, 'public/css/softandtech');

// Ensure destination directories exist
if (!fs.existsSync(destJsDir)) fs.mkdirSync(destJsDir, { recursive: true });
if (!fs.existsSync(destCssDir)) fs.mkdirSync(destCssDir, { recursive: true });

// Helper to copy and overwrite only the target file
const safeCopy = (src, dest) => {
  try {
    fs.copyFileSync(src, dest);
    console.log(`[SoftAndTech] Copied: ${path.basename(dest)}`);
  } catch (err) {
    console.error(`[SoftAndTech] Failed to copy ${path.basename(src)}:`, err);
  }
};

// Copy only the necessary files
safeCopy(jsSource, path.join(destJsDir, 'stsCalendar.js'));
safeCopy(cssSource, path.join(destCssDir, 'stsCalendar.min.css'));
