
// This is a simple script to generate placeholder icons
// In a real project, you would use actual icon files
// Run with Node.js: node generate-icons.js

const fs = require('fs');
const path = require('path');

// Create SVG icon data with different sizes
const createIconSVG = (size) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#4F46E5"/>
    <path d="M${size/2-size/4},${size/2} a${size/4},${size/4} 0 1,0 ${size/2},0 a${size/4},${size/4} 0 1,0 -${size/2},0" fill="white"/>
    <path d="M${size/2+size/8},${size/2-size/8} l${size/12},${size/12} l${size/12},-${size/12}" stroke="white" stroke-width="${size/24}" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
};

// Convert SVG to PNG (placeholder code - in real world you'd use a library)
// For this example, we'll just save the SVG files with .png extension
// You would need to convert these properly for production
const saveSVGasIcon = (svg, size) => {
  const iconPath = path.join(__dirname, `icon${size}.png`);
  fs.writeFileSync(iconPath, svg);
  console.log(`Created icon${size}.png`);
};

// Generate icons for different sizes
[16, 48, 128].forEach(size => {
  const svg = createIconSVG(size);
  saveSVGasIcon(svg, size);
});

console.log('Icons generated. Note: these are SVG files with .png extension.');
console.log('For production, convert these to actual PNG files.');
