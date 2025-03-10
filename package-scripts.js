
// This is a workaround since we can't directly modify package.json
// Run these commands manually:

/*
Update your package.json to add these scripts:

"build:extension": "vite build && node package-extension.js",
"package:extension": "node package-extension.js"
*/

console.log(`
Please run these commands to build and package your extension:

1. Build the extension:
   npm run build

2. Package the extension:
   node package-extension.js

This will create a file called 'prospect-crm-extension.zip' that you can upload to the Edge Add-ons store.
`);
