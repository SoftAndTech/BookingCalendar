import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle module path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source paths from inside the package
const jsSource = path.join(__dirname, 'dist/js/stsCalendar.js');
const cssSource = path.join(__dirname, 'dist/css/stsCalendar.min.css');

// Function to find Laravel root by going up directories until "artisan" is found
function findLaravelRoot(startDir) {
    let dir = startDir;
    while (dir !== path.parse(dir).root) {
        if (fs.existsSync(path.join(dir, 'artisan'))) {
            return dir;
        }
        dir = path.dirname(dir);
    }
    throw new Error('Laravel project root not found (no artisan file detected).');
}

// Resolve Laravel project root
const projectRoot = findLaravelRoot(__dirname);

// Target folders
const jsTargetDir = path.join(projectRoot, 'public/js/softandtech');
const cssTargetDir = path.join(projectRoot, 'public/css/softandtech');

// Ensure destination folders exist
fs.mkdirSync(jsTargetDir, { recursive: true });
fs.mkdirSync(cssTargetDir, { recursive: true });

// Function to safely copy a file and overwrite only the target file
function copyFilePreserveOthers(src, destDir, filename) {
    const dest = path.join(destDir, filename);
    try {
        fs.copyFileSync(src, dest);
        console.log(`[SoftAndTech] Copied ${filename} to ${destDir}`);
    } catch (error) {
        console.error(`[SoftAndTech] Failed to copy ${filename}:`, error);
    }
}

// Perform file copies
copyFilePreserveOthers(jsSource, jsTargetDir, 'stsCalendar.js');
copyFilePreserveOthers(cssSource, cssTargetDir, 'stsCalendar.min.css');
