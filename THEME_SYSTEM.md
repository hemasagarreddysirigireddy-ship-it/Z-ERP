# Theme System Documentation

## Overview
The Z-ERP application now includes a comprehensive global theme system supporting both **Light** and **Dark** modes with smooth transitions.

## Architecture

### 1. Theme Context (`/src/context/ThemeContext.tsx`)
- **Purpose**: Manages global theme state across the application
- **Features**:
  - Theme state management (light/dark)
  - LocalStorage persistence
  - Automatic DOM attribute updates (`data-theme`)
  - Toggle functionality

**Usage**:
```typescript
import { useTheme } from './context/ThemeContext';

const { theme, toggleTheme } = useTheme();
// theme: 'light' | 'dark'
// toggleTheme: () => void
```

### 2. CSS Variables (`/src/styles/Dashboard.css`)
Comprehensive CSS custom properties for both themes:

#### Light Theme Variables
```css
:root, [data-theme="light"] {
  /* Main Colors */
  --bg-main: #f8fafc;           /* Main background */
  --bg-header: #ffffff;         /* Header background */
  --bg-elevated: #ffffff;       /* Cards, modals */
  --text-main: #1e293b;         /* Primary text */
  --text-muted: #64748b;        /* Secondary text */
  
  /* Accent Colors (Purple/Indigo) */
  --accent: #6366f1;            /* Primary accent */
  --accent-soft: rgba(99, 102, 241, 0.1);
  --accent-hover: #4f46e5;
  --accent-light: #818cf8;
  --accent-glow: rgba(99, 102, 241, 0.3);
  
  /* Borders */
  --border-subtle: #e2e8f0;
  --border-medium: #cbd5e1;
  
  /* Shadows */
  --shadow-soft: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow-colored: 0 4px 16px rgba(99, 102, 241, 0.2);
}
```

#### Dark Theme Variables
```css
[data-theme="dark"] {
  /* Main Colors - Dark slate/neutral tones */
  --bg-main: #0f172a;
  --bg-header: #1e293b;
  --bg-elevated: #1e293b;
  --text-main: #f1f5f9;         /* Light and readable */
  --text-muted: #94a3b8;
  
  /* Accent Colors - Retain purple/indigo tone */
  --accent: #818cf8;
  --accent-soft: rgba(129, 140, 248, 0.15);
  --accent-hover: #a5b4fc;
  
  /* Enhanced shadows for dark mode */
  --shadow-soft: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  --shadow-colored: 0 4px 16px rgba(129, 140, 248, 0.3);
}
```

### 3. Theme Toggle Component (`/src/components/ThemeToggle.tsx`)
- **Location**: Added to the header (top-right)
- **Features**:
  - Animated icon transitions (Sun ↔ Moon)
  - Visual feedback on click
  - Accessible (ARIA labels)
  - Responsive design
  - Smooth animations

### 4. Smooth Transitions
All theme changes include smooth CSS transitions:

```css
*,
*::before,
*::after {
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Implementation Guide

### Integration Steps

1. **Wrap App with ThemeProvider** (`main.tsx`):
```typescript
import { ThemeProvider } from './context/ThemeContext';

<ThemeProvider>
  <LanguageProvider>
    <App />
  </LanguageProvider>
</ThemeProvider>
```

2. **Use CSS Variables in Components**:
```css
.my-component {
  background: var(--bg-elevated);
  color: var(--text-main);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-soft);
}

.my-button {
  background: var(--accent);
  color: white;
}

.my-button:hover {
  background: var(--accent-hover);
  box-shadow: var(--shadow-colored);
}
```

3. **Access Theme in Components**:
```typescript
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

## Available CSS Variables

### Colors
| Variable | Light | Dark | Purpose |
|----------|-------|------|---------|
| `--bg-main` | #f8fafc | #0f172a | Main background |
| `--bg-header` | #ffffff | #1e293b | Header/navbar |
| `--bg-elevated` | #ffffff | #1e293b | Cards, modals |
| `--text-main` | #1e293b | #f1f5f9 | Primary text |
| `--text-muted` | #64748b | #94a3b8 | Secondary text |
| `--accent` | #6366f1 | #818cf8 | Primary accent |
| `--accent-soft` | rgba(..., 0.1) | rgba(..., 0.15) | Subtle backgrounds |

### Spacing
- `--spacing-xs`: 0.5rem
- `--spacing-sm`: 0.75rem
- `--spacing-md`: 1rem
- `--spacing-lg`: 1.5rem
- `--spacing-xl`: 2rem
- `--spacing-2xl`: 3rem

### Borders
- `--border-radius`: 12px
- `--border-radius-sm`: 8px
- `--border-radius-lg`: 16px
- `--border-subtle`: Border color
- `--border-medium`: Medium border
- `--border-strong`: Strong border

### Shadows
- `--shadow-soft`: Subtle shadow
- `--shadow-sm`: Small shadow
- `--shadow-md`: Medium shadow
- `--shadow-lg`: Large shadow
- `--shadow-xl`: Extra large shadow
- `--shadow-colored`: Colored accent shadow

## Features

### 1. LocalStorage Persistence
- Theme preference is saved to `localStorage`
- Automatically restored on page load
- Key: `'theme'`
- Values: `'light'` | `'dark'`

### 2. Default Theme
- Default: **Light mode**
- Falls back to light if no saved preference

### 3. Smooth Transitions
- All color changes animate smoothly (0.3s)
- Uses cubic-bezier easing for natural feel
- No jarring flashes

### 4. Accessibility
- ARIA labels on toggle button
- Semantic HTML
- Keyboard accessible
- Screen reader friendly

### 5. Responsive Design
- Toggle button adapts to screen size
- Mobile: Icon only
- Desktop: Icon + label

## Color Philosophy

### Light Theme
- Clean, bright backgrounds (#f8fafc, #ffffff)
- Dark text for high contrast (#1e293b)
- Purple/indigo accents (#6366f1)
- Subtle shadows for depth

### Dark Theme
- Dark slate backgrounds (#0f172a, #1e293b)
- Light, readable text (#f1f5f9)
- Lighter purple accents (#818cf8) for visibility
- Stronger shadows for depth
- Maintains brand identity

## Best Practices

### 1. Always Use CSS Variables
❌ **Don't**:
```css
.component {
  background: #ffffff;
  color: #000000;
}
```

✅ **Do**:
```css
.component {
  background: var(--bg-elevated);
  color: var(--text-main);
}
```

### 2. Test Both Themes
- Always test your components in both light and dark modes
- Use the theme toggle button frequently during development

### 3. Maintain Contrast
- Ensure text remains readable in both themes
- Use `--text-main` for important text
- Use `--text-muted` for secondary text

### 4. Use Semantic Variables
- Choose variables based on purpose, not appearance
- Use `--bg-elevated` for cards (not `--bg-secondary`)
- Use `--accent` for primary actions

### 5. Leverage Accent Colors
- Use `--accent` for primary actions
- Use `--accent-soft` for subtle backgrounds
- Use `--accent-glow` for shadows/glows

## Troubleshooting

### Theme Not Persisting
- Check browser console for localStorage errors
- Verify ThemeProvider wraps entire app
- Clear localStorage and test: `localStorage.clear()`

### Colors Not Changing
- Ensure you're using CSS variables (`var(--...)`)
- Check if `data-theme` attribute is on `<html>`
- Inspect element to verify variable values

### Transitions Too Slow/Fast
- Adjust transition duration in Dashboard.css
- Modify: `transition: ... 0.3s ...` to desired speed

### Component Looks Wrong in Dark Mode
- Check if component uses hardcoded colors
- Replace with CSS variables
- Test specific dark mode overrides if needed

## Future Enhancements

Potential improvements:
1. **System Theme Detection**: Auto-detect OS preference
2. **Custom Themes**: Allow user-defined color schemes
3. **Theme Preview**: Show preview before applying
4. **Scheduled Themes**: Auto-switch based on time
5. **Per-Module Themes**: Different themes for different sections

## File Structure

```
src/
├── context/
│   └── ThemeContext.tsx       # Theme state management
├── components/
│   ├── ThemeToggle.tsx        # Toggle button component
│   ├── ThemeToggle.css        # Toggle button styles
│   └── Header.tsx             # Includes ThemeToggle
├── styles/
│   ├── Dashboard.css          # Main theme variables
│   └── theme.css              # Additional theme styles
└── main.tsx                   # ThemeProvider wrapper
```

## Summary

The theme system provides:
- ✅ Global light/dark mode support
- ✅ LocalStorage persistence
- ✅ Smooth CSS transitions
- ✅ Comprehensive CSS variables
- ✅ Accessible toggle button
- ✅ Purple/indigo accent colors
- ✅ Readable text in both modes
- ✅ Dark slate/neutral dark theme
- ✅ Easy integration
- ✅ Responsive design

The system is production-ready and fully integrated!
