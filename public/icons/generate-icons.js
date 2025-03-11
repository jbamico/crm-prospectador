
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Sizes for the icons
const sizes = [16, 48, 128];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname);
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate icons for each size
sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Set background color
  ctx.fillStyle = '#3b82f6'; // Blue background
  ctx.fillRect(0, 0, size, size);
  
  // Draw a simple "P" letter
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.6}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('P', size / 2, size / 2);
  
  // Save the icon
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, `icon${size}.png`), buffer);
  
  console.log(`Generated icon${size}.png`);
});

console.log('Icon generation complete!');
