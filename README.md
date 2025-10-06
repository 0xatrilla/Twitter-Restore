# Twitter Restoration Chrome Extension 🐦

A Chrome extension that restores Twitter's classic blue branding and iconic bird logo, removing the X rebrand.

## Features

- 🐦 **Restores the Twitter Bird Logo** - Replaces all X logos with the classic Twitter bird
- 💙 **Twitter Blue Theme** - Changes the color scheme from black back to Twitter's signature blue (#1DA1F2)
- 🏷️ **Text Replacements** - Changes "Post" back to "Tweet" and updates page titles
- 🎨 **Complete UI Overhaul** - Updates buttons, links, tabs, and interactive elements
- 🔄 **Dynamic Updates** - Monitors the page for changes and applies styling in real-time

## Installation

### Method 1: Load as Unpacked Extension (Development Mode)

1. **Clone or download this repository** to your local machine

2. **Open Chrome Extensions page**
   - Navigate to `chrome://extensions/`
   - Or click the three dots menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension**
   - Click "Load unpacked"
   - Select the folder containing this extension
   - The extension should now appear in your extensions list

5. **Visit Twitter/X**
   - Go to https://twitter.com or https://x.com
   - Enjoy the classic Twitter experience! 🎉

## What Gets Changed

### Visual Changes
- All X logos → Twitter bird logo 🐦
- Black accent color (#000000) → Twitter blue (#1DA1F2)
- Buttons, links, and interactive elements
- Tab indicators and active states
- Verified badges
- Loading spinners and progress bars

### Text Changes
- Page title: "X" → "Twitter"
- Button labels: "Post" → "Tweet"
- Favicon updated to Twitter blue

## How It Works

The extension consists of three main components:

1. **manifest.json** - Extension configuration and permissions
2. **content.js** - JavaScript that replaces logos and text dynamically
3. **twitter-theme.css** - CSS rules that override X's styling with Twitter blue

The extension uses:
- **Content Scripts** to inject custom code into Twitter/X pages
- **CSS Overrides** to change colors and styling
- **MutationObserver** to detect and update dynamically loaded content
- **DOM Manipulation** to replace SVG logos

## Compatibility

- ✅ Works on both twitter.com and x.com
- ✅ Chrome, Edge, Brave, and other Chromium-based browsers
- ✅ Manifest V3 compliant (latest Chrome extension standard)

## Troubleshooting

**Extension not working?**
- Make sure Developer Mode is enabled
- Try reloading the extension (click the refresh icon)
- Hard refresh the Twitter/X page (Ctrl+Shift+R or Cmd+Shift+R)

**Colors not changing?**
- Twitter/X might have updated their class names
- You may need to update the CSS selectors in `twitter-theme.css`

**Logos not replacing?**
- Check the browser console (F12) for any errors
- Make sure the extension is enabled and active

## Privacy

This extension:
- ✅ Only runs on twitter.com and x.com
- ✅ Does not collect any data
- ✅ Does not make any external network requests
- ✅ Does not require any special permissions
- ✅ All processing happens locally in your browser

## Contributing

Feel free to:
- Report bugs or issues
- Suggest new features
- Submit pull requests
- Improve the CSS styling
- Add additional logo replacements

## License

This is a fan-made extension created for personal use and nostalgia. Twitter and the Twitter bird logo are trademarks of Twitter, Inc.

## Disclaimer

This extension is not affiliated with, endorsed by, or sponsored by Twitter, Inc. or X Corp. It's a user-created modification for personal preference.
