#!/usr/bin/env node

/**
 * Icon Generator for Twitter Restoration Extension
 * Generates simple placeholder icons for testing
 * 
 * Run with: node generate-icons.js
 * 
 * For better icons, replace these with actual Twitter bird logos
 */

const fs = require('fs');
const path = require('path');

// Simple SVG to PNG conversion using Canvas (requires canvas package)
// For simplicity, we'll create SVG files that can be manually converted

const sizes = [16, 48, 128];

// Create a simple Twitter-blue square SVG for each size
function generateSVGIcon(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#1DA1F2"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.floor(size * 0.6)}" fill="white" text-anchor="middle" dominant-baseline="middle">🐦</text>
</svg>`;
}

// Twitter bird path scaled for different sizes
function generateBirdSVG(size) {
  const scale = size / 24; // Original viewBox is 24x24
  const viewBox = `0 0 ${size} ${size}`;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#1DA1F2"/>
  <g transform="scale(${scale})">
    <path fill="#FFFFFF" d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
  </g>
</svg>`;
}

const iconsDir = path.join(__dirname, 'icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Generating Twitter Restoration extension icons...\n');

// Generate SVG files for each size
sizes.forEach(size => {
  const filename = `icon${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  const svg = generateBirdSVG(size);
  
  fs.writeFileSync(filepath, svg);
  console.log(`✅ Created ${filename}`);
});

console.log('\n📝 SVG icons created successfully!');
console.log('\n⚠️  IMPORTANT: Chrome extensions require PNG files.');
console.log('\nTo convert SVG to PNG:');
console.log('\n  Option 1 - Online converter:');
console.log('    1. Go to https://cloudconvert.com/svg-to-png');
console.log('    2. Upload each SVG file from the icons/ folder');
console.log('    3. Download and save as icon16.png, icon48.png, icon128.png');
console.log('\n  Option 2 - Using ImageMagick (if installed):');
console.log('    brew install imagemagick');
console.log('    cd icons');
console.log('    for i in 16 48 128; do convert icon$i.svg icon$i.png; done');
console.log('\n  Option 3 - Manual conversion:');
console.log('    1. Open each SVG file in a browser');
console.log('    2. Take a screenshot or use browser dev tools to save as PNG');
console.log('    3. Save with the correct filename\n');

// Create a helper HTML file for manual conversion
const htmlConverter = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Icon Converter</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }
    .icon-container {
      display: inline-block;
      margin: 20px;
      text-align: center;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    img {
      display: block;
      margin: 10px auto;
      border: 1px solid #ddd;
    }
    h1 {
      color: #1DA1F2;
    }
    .instructions {
      background: #E8F5FE;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #1DA1F2;
    }
  </style>
</head>
<body>
  <h1>🐦 Twitter Restoration - Icon Converter</h1>
  
  <div class="instructions">
    <strong>Instructions:</strong>
    <ol>
      <li>Right-click on each icon below</li>
      <li>Select "Save image as..."</li>
      <li>Save as PNG with the filename shown below each icon</li>
      <li>Save all files to the <code>icons/</code> folder</li>
    </ol>
  </div>

  <div class="icon-container">
    <h3>16x16 Icon</h3>
    <img src="icon16.svg" width="16" height="16" alt="16x16 icon">
    <p>Save as: <strong>icon16.png</strong></p>
  </div>

  <div class="icon-container">
    <h3>48x48 Icon</h3>
    <img src="icon48.svg" width="48" height="48" alt="48x48 icon">
    <p>Save as: <strong>icon48.png</strong></p>
  </div>

  <div class="icon-container">
    <h3>128x128 Icon</h3>
    <img src="icon128.svg" width="128" height="128" alt="128x128 icon">
    <p>Save as: <strong>icon128.png</strong></p>
  </div>

  <div class="instructions">
    <strong>Alternative:</strong> Use browser DevTools to capture these icons as PNG:
    <ol>
      <li>Right-click on an icon → "Inspect"</li>
      <li>In DevTools, right-click the &lt;img&gt; element</li>
      <li>Select "Capture node screenshot"</li>
      <li>Save with the correct filename</li>
    </ol>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(iconsDir, 'converter.html'), htmlConverter);
console.log('📄 Created converter.html in icons/ folder');
console.log('   Open icons/converter.html in your browser for easy PNG conversion!\n');

