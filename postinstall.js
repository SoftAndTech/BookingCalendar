import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source files inside the package
const jsSource = path.join(__dirname, 'dist/js/stsCalendar.js');
const cssSource = path.join(__dirname, 'dist/css/stsCalendar.min.css');

// Helper: Detect Laravel root (by locating artisan file)
function findLaravelRoot(startDir) {
    let dir = startDir;
    while (dir !== path.parse(dir).root) {
        if (fs.existsSync(path.join(dir, 'artisan'))) {
            return dir;
        }
        dir = path.dirname(dir);
    }
    return null;
}

// Determine current project root
const cwd = process.cwd();
const laravelRoot = findLaravelRoot(cwd);

// Function to safely copy file
function copyFile(src, destDir, filename) {
    const dest = path.join(destDir, filename);
    try {
        fs.copyFileSync(src, dest);
        console.log(`[SoftAndTech] ✅ Copied ${filename} → ${destDir}`);
    } catch (err) {
        console.error(`[SoftAndTech] ❌ Failed to copy ${filename}:`, err.message);
    }
}

if (laravelRoot) {
    // Laravel detected: copy files to public
    const jsTargetDir = path.join(laravelRoot, 'public/js/softandtech');
    const cssTargetDir = path.join(laravelRoot, 'public/css/softandtech');

    fs.mkdirSync(jsTargetDir, { recursive: true });
    fs.mkdirSync(cssTargetDir, { recursive: true });

    copyFile(jsSource, jsTargetDir, 'stsCalendar.js');
    copyFile(cssSource, cssTargetDir, 'stsCalendar.min.css');
} else {
    // Not Laravel: show usage instructions for manual use
    console.log(`\n[SoftAndTech] 📦 Booking Calendar installed.`);

    console.log(`\n👉 Detected non-Laravel environment. No auto-copy was done.`);
    console.log(`\n🔧 You can manually import the files like this:\n`);

    console.log(`JS:   node_modules/@softandtech/booking-calendar/dist/js/stsCalendar.js`);
    console.log(`CSS:  node_modules/@softandtech/booking-calendar/dist/css/stsCalendar.min.css\n`);

    console.log(`Include them in your HTML or Webpack/Vite entry point as needed.`);
}
