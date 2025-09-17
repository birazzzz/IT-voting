# Design Guidelines

## Color Palette

- **Primary Background**: #edeae7 (Warm light gray)
- **Card Background**: #ffffff (White)
- **Border Color**: #dedede (Light gray)
- **Hover Border**: #81EDFF (Light blue)
- **Primary Text**: #222222 (Dark gray)
- **Secondary Text**: #666666 (Medium gray)
- **Icon Background**: #f5f5f5 (Very light gray)
- **Accent Color**: #81EDFF (Light blue)

## Typography

- **Font Family**: Manrope (Google Font)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Base Font Size**: 16px
- **Title Size**: 1.1rem
- **Subtitle Size**: 0.9rem

## Spacing System

- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **XXL**: 40px

## Border Radius

- **SM**: 8px
- **MD**: 12px
- **LG**: 16px
- **XL**: 24px
- **Pill**: 999px (for circular buttons)

## Shadows

- **SM**: 0 2px 8px rgba(0, 0, 0, 0.1)
- **MD**: 0 4px 12px rgba(0, 0, 0, 0.1)
- **LG**: 0 8px 32px rgba(0, 0, 0, 0.1)

## Transitions

- **Fast**: 0.2s ease
- **Medium**: 0.3s ease
- **Slow**: 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)

## Component Design Principles

### Cards
- Use subtle hover effects (elevation and border color change)
- Maintain consistent padding and spacing
- Use rounded corners (16px radius)
- Implement smooth transitions

### Buttons
- Use pill-shaped buttons (999px border radius)
- Apply hover effects with color changes
- Include icons when appropriate
- Maintain consistent sizing

### Grid Layout
- Use responsive grid with auto-fill and minmax
- Maintain consistent gutters
- Center content with max-width container

### Icons
- Use Material Symbols Outlined
- Size appropriately for context
- Center within containers
- Use consistent color scheme

## Responsive Design

- Mobile-first approach
- Single column layout on small screens
- Adjust component sizes for different viewports
- Maintain touch-friendly targets (minimum 48px)