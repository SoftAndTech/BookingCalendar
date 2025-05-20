import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Enable __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source files inside the package
const jsSource = path.join(__dirname, 'dist/js/stsCalendar.js');
const cssSource = path.join(__dirname, 'dist/css/stsCalendar.min.css');

// Helper to locate Laravel root by finding "artisan"
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

// Try detecting Laravel root using both process.cwd() and __dirname
const cwdRoot = findLaravelRoot(process.cwd());
const dirRoot = findLaravelRoot(__dirname);
const laravelRoot = cwdRoot || dirRoot;

// Function to copy a file safely
function copyFile(src, destDir, filename) {
    const dest = path.join(destDir, filename);
    try {
        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(src, dest);
        console.log(`[SoftAndTech] ✅ Copied ${filename} → ${destDir}`);
    } catch (err) {
        console.error(`[SoftAndTech] ❌ Failed to copy ${filename}:`, err.message);
    }
}

// Laravel: Copy assets to public path
if (laravelRoot) {
    const jsTargetDir = path.join(laravelRoot, 'public/js/softandtech');
    const cssTargetDir = path.join(laravelRoot, 'public/css/softandtech');

    copyFile(jsSource, jsTargetDir, 'stsCalendar.js');
    copyFile(cssSource, cssTargetDir, 'stsCalendar.min.css');

    console.log('\n[SoftAndTech] 📦 stsCalendar installed successfully in your Laravel project.\n');
} else {
    // Non-Laravel: Show manual usage hints
    console.log(`\n[SoftAndTech] 📦 stsCalendar installed.`);

    console.log(`\n👉 Detected non-Laravel environment. No auto-copy was done.`);
    console.log(`\n🔧 You can manually import the files like this:\n`);

    console.log(`JS:   node_modules/@softandtech/booking-calendar/dist/js/stsCalendar.js`);
    console.log(`CSS:  node_modules/@softandtech/booking-calendar/dist/css/stsCalendar.min.css\n`);

    console.log(`Include them in your HTML or in your bundler (Vite, Webpack, etc) as needed.`);
}
