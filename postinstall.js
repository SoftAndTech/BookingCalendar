const fs = require('fs');
const path = require('path');

// Destination folders
const destJs = path.resolve('public/js');
const destCss = path.resolve('public/css');

// Source files (relative to this package)
const srcJs = path.resolve(__dirname, 'dist/js/stsCalendar.js');
const srcCss = path.resolve(__dirname, 'dist/css/stsCalendar.min.css');

// Create directories if they don't exist
if (!fs.existsSync(destJs)) fs.mkdirSync(destJs, { recursive: true });
if (!fs.existsSync(destCss)) fs.mkdirSync(destCss, { recursive: true });

// Copy files
fs.copyFileSync(srcJs, path.join(destJs, 'stsCalendar.js'));
fs.copyFileSync(srcCss, path.join(destCss, 'stsCalendar.min.css'));

console.log('[BookingCalendar] Assets copied to /public folder');
