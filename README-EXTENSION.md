
# Prospect CRM Edge Extension

This browser extension allows you to add prospects to your CRM in a few clicks, directly from any webpage.

## Installation in Microsoft Edge

1. Build the extension by running:
   ```
   npm run build
   ```

2. Package the extension:
   ```
   node package-extension.js
   ```

3. Open Microsoft Edge and navigate to `edge://extensions/`

4. Enable "Developer mode" in the bottom-left corner

5. Click "Load unpacked" and select the `dist` folder from this project

6. Alternatively, you can load the packaged extension by dragging the `prospect-crm-extension.zip` file into the extensions page

## Usage

- A floating button will appear on every page
- Click it to add the current prospect to your CRM
- View your prospects by clicking on the extension icon in the toolbar

## Development

To run in development mode:
```
npm run dev
```

To build the extension:
```
npm run build
```

To package the extension for distribution:
```
node package-extension.js
```
