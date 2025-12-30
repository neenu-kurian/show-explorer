# Movie Explorer

A modern Next.js application for exploring movies and TV shows with genre-based browsing, search functionality, and detailed show information.

## Features

- **Browse by Genre**: Discover movies and shows organized by categories
- **Search Functionality**: Find specific movies and shows with intelligent search
- **Detailed Information**: View comprehensive details including cast, ratings, and summaries
- **Responsive Design**: Built with Tailwind CSS for optimal viewing on all devices
- **Modern Stack**: Built with Next.js 16, React 19, and TypeScript

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: React Query (@tanstack/react-query)
- **Testing**: Jest with React Testing Library
- **Icons**: React Icons
- **API**: TVMaze API

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-explorer-next
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage report

## Project Structure

```
app/
├── components/          # Reusable React components
│   ├── Card.tsx        # Movie/show card component
│   ├── CastMember.tsx  # Cast member display
│   ├── HomeClient.tsx  # Main home page component
│   ├── SearchInput.tsx # Search functionality
│   └── ...
├── hooks/              # Custom React hooks
├── queries/            # React Query configurations
├── types/              # TypeScript type definitions
├── utilities/          # Utility functions
├── show/[id]/          # Dynamic show detail pages
└── tests/              # Test files
```

## Key Components

### HomeClient
Main component that displays shows organized by genre with search and sorting capabilities.

### Show Details Page
Dynamic route (`/show/[id]`) that displays comprehensive information about a specific show including:
- Show metadata (rating, runtime, premiere date)
- Cast information
- Summary and details

### Search Functionality
- Debounced search input for better performance
- Real-time search results from TVMaze API
- Error handling for search failures

## API Integration

The application uses the [TVMaze API](https://www.tvmaze.com/api) for fetching show data:
- Shows endpoint: `/shows`
- Search endpoint: `/search/shows`
- Show details: `/shows/{id}`

## Testing

The project includes comprehensive testing with Jest and React Testing Library:

- Unit tests for components
- Integration tests for user interactions
- Test coverage reporting

Run tests with:
```bash
npm run test
npm run test:watch
npm run test:cov
```

## Development

### Code Style

- Uses ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture

### Environment Variables

Create a `.env.local` file for environment-specific configuration (if needed).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is private and proprietary.

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Query](https://tanstack.com/query) - Data fetching
- [TVMaze API](https://www.tvmaze.com/api) - Show data