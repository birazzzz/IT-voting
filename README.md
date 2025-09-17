# Voting Application

A modern Impact Token platform built with React following our design system guidelines.

## Features

- QR code landing page for easy access
- Token awarding page with form for recipient information and candidate selection
- Leaderboard page with Impact Token visualization
- Dashboard for viewing awarded tokens
- Lodge page for managing candidates and viewing voter-candidate relationships
- Responsive design that works on all devices
- Clean, modern UI following our design system
- Netlify Forms integration for data collection

## Project Structure

```
src/
  ├── components/
  │   ├── HomePage.js       # QR code landing page
  │   ├── VotingPage.js     # Token awarding page with recipient form
  │   ├── ResultsPage.js    # Impact Token leaderboard page
  │   ├── Dashboard.js      # Awarded tokens dashboard
  │   └── LodgePage.js      # Candidate management and voter relationships
  ├── App.js                # Main application with routing
  ├── index.js              # Entry point
  ├── styles.css            # Design system CSS variables
  └── design-guidelines.md  # Design principles documentation
```

## Design System

This application follows our established design system with:

- Consistent color palette
- Responsive grid layout
- Smooth animations and transitions
- Accessible components
- Mobile-first approach

Refer to [design-guidelines.md](src/design-guidelines.md) for detailed design principles.

## Netlify Forms Integration

This application uses Netlify Forms for collecting Impact Token data:

1. All token awards are automatically captured by Netlify Forms
2. Form data can be accessed through the Netlify dashboard
3. No server-side code is required for basic functionality
4. Spam protection is implemented with honeypot fields

To access form submissions:
1. Go to your Netlify dashboard
2. Navigate to Forms → "vote-form"
3. View and export submissions

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

## Components

### HomePage
The main landing page featuring a large QR code that users can scan or click to navigate to the token awarding page. Also includes navigation buttons to access all other pages.

### VotingPage
Displays a form for users to enter their information and select a candidate to award their Impact Token. The form is integrated with Netlify Forms for automatic data collection.

### ResultsPage
Shows a leaderboard of all candidates with Impact Token counts and percentages.

### Dashboard
Displays a table of all awarded Impact Tokens with recipient information, including token ID, recipient name, email, awarded candidate, and award time. In a production environment, this would fetch data from Netlify Forms API.

### LodgePage
Allows administrators to manage candidates by adding or removing them. Also displays a table showing the relationship between voters and their selected candidates.

## Styling

The application uses CSS variables defined in our design system for consistent styling. All components follow the established design guidelines for spacing, colors, typography, and interactions.