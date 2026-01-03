# Favicon Setup

This directory should contain the following favicon files:

## Required Files

1. **favicon.ico** - Main favicon (16x16, 32x32, 48x48 sizes)
2. **favicon.svg** - SVG favicon (already created)
3. **apple-touch-icon.png** - Apple touch icon (180x180)
4. **icon-192x192.png** - Android icon (192x192)
5. **icon-512x512.png** - Android icon (512x512)

## How to Generate Favicons

1. Visit a favicon generator like:
   - https://realfavicongenerator.net/
   - https://favicon.io/
   - https://www.favicon-generator.org/

2. Upload a square image (at least 512x512 pixels) with the LicenseChain shield logo

3. Download the generated favicon package

4. Place the following files in the `public/` directory:
   - favicon.ico
   - apple-touch-icon.png
   - icon-192x192.png
   - icon-512x512.png

## Current Status

- ✅ favicon.svg - Created (SVG format)
- ⏳ favicon.ico - Needs to be generated
- ⏳ apple-touch-icon.png - Needs to be generated
- ⏳ icon-192x192.png - Needs to be generated
- ⏳ icon-512x512.png - Needs to be generated

The layout.tsx is already configured to use these files once they are added.

