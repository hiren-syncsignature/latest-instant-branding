# Side Panel Browser Extension

A simple browser extension that adds a side panel with a "Hello World" message when the extension button is clicked.

## Features

- Side panel with white background
- Panel takes full height of the browser window
- "Hello World" message centered in the panel
- Close button to dismiss the panel
- Toggle panel visibility by clicking the extension icon
- Uses Shadow DOM for proper encapsulation
- Styled with Tailwind CSS for clean, responsive design

## Installation

### Chrome / Edge / Brave / Other Chromium browsers:

1. Open your browser and go to the extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`

2. Enable "Developer mode" (usually a toggle switch in the top-right corner)

3. Click "Load unpacked" button

4. Select the `public` folder of this project

5. The extension should now be installed and visible in your browser's toolbar

## Usage

1. Navigate to any website

2. Click on the extension icon in your browser toolbar (the blue "S" icon)

3. A white side panel will appear on the right side of the screen with "Hello World" text

4. Click the "×" button in the top-left corner of the panel to close it, or click the extension icon again to toggle visibility

## Technical Details

- Uses Shadow DOM to encapsulate styles and prevent conflicts with the host page
- Loads Tailwind CSS from CDN within the Shadow DOM
- Pure vanilla JavaScript, no dependencies required
- Lightweight and performant

## File Structure

- `manifest.json` - Extension configuration
- `background.js` - Handles extension button clicks
- `content.js` - Injects and manages the side panel with Shadow DOM and Tailwind
- `icons/` - Extension icons in various sizes 