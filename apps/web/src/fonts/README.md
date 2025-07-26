# Premium Tech Startup Fonts

This directory contains the premium fonts for the tech startup aesthetic:

## Font Stack Overview

### Primary Fonts (Loaded from Fontshare API)

1. **Cabinet Grotesk** (for headings)
   - Modern, geometric sans-serif with excellent readability
   - Used for: Main headings, section titles, hero text
   - Weights: 300-900

2. **Clash Display** (for display text)
   - Contemporary display font with strong personality
   - Used for: Hero text, large headlines, brand elements
   - Weights: 400-700

3. **Satoshi** (for headings)
   - Clean, modern sans-serif with excellent legibility
   - Used for: Secondary headings, UI elements
   - Weights: 300-900

4. **Switzer** (for body text)
   - Highly readable sans-serif optimized for screens
   - Used for: Body text, paragraphs, general content
   - Weights: 300-900

5. **General Sans** (for accent text)
   - Versatile sans-serif with good character
   - Used for: Accent text, buttons, labels
   - Weights: 300-700

### Fallback Fonts

- **Inter** (from Google Fonts) - Primary fallback
- **JetBrains Mono** (for code) - Monospace font
- System fonts as final fallback

## Font Usage Classes

### CSS Classes Available

- `.font-heading` - Cabinet Grotesk for main headings
- `.font-display` - Clash Display for hero/display text
- `.font-body` - Switzer for body text
- `.font-accent` - General Sans for accent text
- `.hero-text` - Optimized hero text styling
- `.section-title` - Section heading styling
- `.btn-text` - Button text styling
- `.card-text` - Card content styling

### Typography Hierarchy

1. **Hero Text**: Clash Display, 800 weight, tight letter spacing
2. **Main Headings**: Cabinet Grotesk, 700 weight
3. **Section Titles**: Cabinet Grotesk, 700 weight
4. **Body Text**: Switzer, 400 weight, optimized line height
5. **Accent Text**: General Sans, 500-600 weight
6. **Code**: JetBrains Mono, 400 weight

## Performance Features

- Fonts loaded with `display=swap` for better performance
- Optimized font-feature-settings for better rendering
- Proper fallback chain for reliability
- Text rendering optimization enabled

## Browser Support

All fonts are web-optimized and support:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Variable font features where available
- Fallback to system fonts for older browsers 