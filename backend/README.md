# Aida Backend

AI Personal Assistant backend service for managing Google Calendar through SMS interactions.

## Quick Start

```bash
# Install dependencies
npm install

# Run in development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Type check without emitting files
npm run type-check
```

The server will start on port 3001 (configurable via `PORT` environment variable).

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint

## Project Structure

```
src/
├── server.ts          # Main server entry point
├── routes/            # API route handlers
├── types/             # TypeScript type definitions
└── config/            # Configuration files
```

## Development

- **Framework**: Fastify with TypeScript
- **Build Tool**: TypeScript compiler
- **Development**: Nodemon with ts-node for hot reloading

## Environment Variables

- `PORT` - Server port (default: 3001)

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled production build
- `npm run type-check` - Run TypeScript type checking

## Architecture

Part of the Aida AI Personal Assistant system that will handle:
- SMS webhook processing via Twilio
- AI-powered message processing pipeline
- Google Calendar API integration
- User authentication and session management