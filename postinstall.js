import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
  sourceDir: join(__dirname, 'dist'),
  targetDir: join(__dirname, '..', 'public', 'booking-calendar'),
  filesToCopy: [
    { from: 'css/stsCalendar.min.css', to: 'stsCalendar.min.css' },
    { from: 'js/stsCalendar.js', to: 'stsCalendar.js' }
  ]
};

// Skip if in npm cache
if (__dirname.includes('npm-cache')) {
  console.log('[BookingCalendar] Skipping postinstall in npm cache');
  process.exit(0);
}

try {
  // Create target directory if needed
  if (!existsSync(CONFIG.targetDir)) {
    mkdirSync(CONFIG.targetDir, { recursive: true });
    console.log(`[BookingCalendar] Created directory: ${CONFIG.targetDir}`);
  }

  // Copy files with validation
  let copiedCount = 0;
  CONFIG.filesToCopy.forEach(({ from, to }) => {
    const sourcePath = join(CONFIG.sourceDir, from);
    const targetPath = join(CONFIG.targetDir, to);

    if (existsSync(sourcePath)) {
      copyFileSync(sourcePath, targetPath);
      console.log(`[BookingCalendar] Copied: ${from} → ${targetPath}`);
      copiedCount++;
    } else {
      console.warn(`[BookingCalendar] Source not found: ${sourcePath}`);
    }
  });

  console.log(`[BookingCalendar] Setup complete. Copied ${copiedCount}/${CONFIG.filesToCopy.length} files`);
} catch (error) {
  console.error('[BookingCalendar] Postinstall error:', error.message);
  process.exit(1);
}