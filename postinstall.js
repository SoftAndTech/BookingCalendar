import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Step 1: Define package source paths
const jsSource = path.join(__dirname, 'dist/js/stsCalendar.js');
const cssSource = path.join(__dirname, 'dist/css/stsCalendar.min.css');

// Step 2: Try to locate Laravel root from current working directory
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

const cwd = process.cwd(); // Laravel root if npm install run from there
const laravelRoot = findLaravelRoot(cwd);

if (!laravelRoot) {
    console.log('[SoftAndTech] Skipping postinstall: Not inside a Laravel project root.');
    process.exit(0);
}

// Step 3: Set target public paths
const jsTargetDir = path.join(laravelRoot, 'public/js/softandtech');
const cssTargetDir = path.join(laravelRoot, 'public/css/softandtech');

fs.mkdirSync(jsTargetDir, { recursive: true });
fs.mkdirSync(cssTargetDir, { recursive: true });

// Step 4: Copy helper
function copyFile(src, destDir, filename) {
    const dest = path.join(destDir, filename);
    try {
        fs.copyFileSync(src, dest);
        console.log(`[SoftAndTech] Copied ${filename} to ${destDir}`);
    } catch (err) {
        console.error(`[SoftAndTech] Failed to copy ${filename}:`, err.message);
    }
}

// Step 5: Copy calendar files
copyFile(jsSource, jsTargetDir, 'stsCalendar.js');
copyFile(cssSource, cssTargetDir, 'stsCalendar.min.css');
