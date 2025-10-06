# Quick Installation Guide 🚀

## Step-by-Step Installation

### 1. Prepare Icon Files (Important!)

Before loading the extension, you need to create or download icon files. The extension won't load without them.

**Quick Solution:** Create three simple blue square PNG files named:
- `icons/icon16.png` (16×16 pixels)
- `icons/icon48.png` (48×48 pixels)  
- `icons/icon128.png` (128×128 pixels)

See `icons/ICON_INSTRUCTIONS.md` for detailed instructions.

### 2. Open Chrome Extensions

**Option A:** Type in address bar
```
chrome://extensions/
```

**Option B:** Via menu
1. Click the three dots (⋮) in top-right corner
2. More Tools → Extensions

### 3. Enable Developer Mode

Toggle the **Developer mode** switch in the top-right corner of the extensions page.

### 4. Load the Extension

1. Click **"Load unpacked"** button (top-left area)
2. Navigate to and select this folder:
   ```
   /Users/callummatthews1/Developer/Chrome Extensions/Name TBD
   ```
3. Click **"Select"** or **"Open"**

### 5. Verify Installation

✅ The extension should appear in your list with the name **"Twitter Restoration"**  
✅ It should show as "Enabled"

### 6. Visit Twitter/X

1. Go to https://twitter.com or https://x.com
2. You should immediately see:
   - 🐦 Twitter bird logo instead of X
   - 💙 Blue color scheme instead of black
   - Tweet buttons instead of Post buttons

### 7. Troubleshooting

**Extension not loading?**
- Make sure icon files exist in the `icons/` folder
- Check that manifest.json is in the root directory

**Not seeing changes on Twitter?**
- Hard refresh the page: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Check the extension is enabled
- Open DevTools (F12) and check console for errors

**Changes not applying fully?**
- Twitter/X updates their site frequently
- The extension may need updates to match new HTML structure
- Report issues so they can be fixed!

## Testing

To verify the extension is working:
1. Open Twitter/X
2. Press F12 to open DevTools
3. Go to the Console tab
4. You should see: `Twitter Restoration extension loaded! 🐦`

## Uninstalling

1. Go to `chrome://extensions/`
2. Find "Twitter Restoration"
3. Click **"Remove"**

---

Enjoy your classic Twitter experience! 💙🐦

