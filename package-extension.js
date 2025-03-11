
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make sure the dist directory exists
if (!fs.existsSync('./dist')) {
  console.error('Error: dist directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Create output zip file
const output = fs.createWriteStream(path.join(__dirname, 'prospect-crm-extension.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('Extension packaged successfully!');
  console.log(`Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log('File: prospect-crm-extension.zip');
});

// Handle warnings and errors
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the output file
archive.pipe(output);

// Add the dist directory contents to the zip
archive.directory('./dist/', false);

// Finalize the archive
archive.finalize();
