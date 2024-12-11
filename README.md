# Star Wars Character Explorer

A React-based web application that allows users to explore Star Wars characters using the SWAPI (Star Wars API). The application features a responsive design, character search functionality, and detailed character information.

## Features

- Browse all Star Wars characters with pagination
- Search characters by name (searches across all available data)
- View detailed information about each character
- See other characters from the same planet
- Responsive design that works on mobile and desktop
- Loading states with Star Wars themed animation
- Error handling with graceful fallbacks

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mousberg/swapi-ui.git
```

2. Install dependencies:
```bash
npm install
```

3. Set Node options (if using Node.js 17+):

For macOS/Linux:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

For Windows:
```bash
set NODE_OPTIONS=--openssl-legacy-provider
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Design Choices

### Architecture
- Used React with functional components and hooks for modern, maintainable code
- Implemented client-side caching to minimize API calls
- Used React Router for navigation between views
- Separated concerns into reusable components

### UI/UX Decisions
- Implemented a clean, minimalist design focusing on content
- Used a Star Wars inspired header with subtle animations
- Added loading states to improve user experience
- Made the design responsive with optimized layouts for different screen sizes
- Implemented efficient pagination with mobile-optimized view

### Performance Optimizations
- Implemented client-side caching for API responses
- Used debounced search to minimize API calls
- Optimized image loading with fallbacks
- Implemented cleanup in useEffect hooks to prevent memory leaks

### Error Handling
- Added error boundaries for graceful error handling
- Implemented loading states for better user feedback
- Added fallback UI for failed image loads
- Proper error messages for failed API calls

## Future Improvements

Given more time, I would add the following features:

1. **Enhanced Features**
   - Advanced filtering (by species, homeworld, etc.)
   - Sorting capabilities
   - Character comparison feature
   - Integration with additional SWAPI endpoints (vehicles, species, etc.)

2. **Technical Improvements**
   - Add TypeScript for better type safety
   - Implement unit tests using Jest and React Testing Library
   - Add end-to-end tests using Cypress
   - Implement server-side rendering for better SEO
   - Add Progressive Web App capabilities

3. **UI/UX Enhancements**
   - Add animations for page transitions
   - Implement infinite scroll as an alternative to pagination
   - Add more interactive elements
   - Enhance mobile experience with gestures
   - Add theme customization options

4. **Performance**
   - Implement proper image optimization
   - Add service workers for offline functionality
   - Implement proper data prefetching
   - Add proper meta tags for SEO

## Technologies Used

- React (^17.0.2)
- React Router DOM (^5.3.0)
- CSS3 with modern features
- SWAPI (Star Wars API)

## Project Structure

```
SWAPI-UI/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── CharacterStats.js
│   │   ├── CompareCharacters.js
│   │   ├── ErrorBoundary.js
│   │   ├── Header.js
│   │   ├── HomePage.js
│   │   ├── LoadingSpinner.js
│   │   ├── PersonCard.js
│   │   └── PersonDetail.js
│   ├── context/
│   ├── index.js
│   └── styles.css
├── package-lock.json
├── package.json
└── README.md
```

## API Integration

The application uses the Star Wars API (SWAPI) for data. Key endpoints used:

- `/people/` - List all characters
- `/people/:id/` - Get specific character details
- `/planets/:id/` - Get planet details

