# Frontend

## Overview

Aida Frontend is the web-based administrative interface for the AI Personal Assistant. It provides user management and system monitoring capabilities for administrators, plus user onboarding and settings management.

## Features

### Admin Dashboard
- **User Management**: View, approve, and manage waitlisted users
- **Usage Statistics**: view users' usage and interaction history

### User Portal
- **Onboarding Flow**: Guided setup for new users
- **Google OAuth Integration**: Secure calendar connection
- **Preference Management**: Configure reminder settings and timezone
- **Usage Statistics**: Personal usage and interaction history
- **Support Interface**: Help documentation and contact forms

### Core Features
- **Responsive Design**: Mobile-first design with desktop optimization
- **Dark/Light Mode**: User preference-based theming
- **Accessibility**: WCAG 2.1 AA compliant
- **Progressive Web App**: Offline capabilities and native app experience

### Authentication & Security
- **Multi-factor Authentication**: SMS OTP + Google OAuth
- **Role-based Access Control**: Admin and user permissions
- **Session Management**: Secure JWT token handling
- **CSRF Protection**: Cross-site request forgery prevention
- **Content Security Policy**: XSS attack prevention

## Technologies

### Core Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+ with CSS Variables
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **State Management**: Zustand for global state

### Data & API
- **Data Fetching**: React Query (TanStack Query) for server state
- **Form Management**: React Hook Form with Zod validation
- **API Client**: Axios with interceptors

### Development & Build
- **Build Tool**: Next.js with Turbopack
- **Package Manager**: npm 10+
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library + Playwright
- **Type Checking**: TypeScript strict mode

### Deployment & Monitoring
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics + PostHog
- **Error Tracking**: Sentry
- **Performance**: Vercel Speed Insights
- **SEO**: Next.js built-in SEO optimization

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Authentication
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Analytics & Monitoring
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Sentry Error Tracking
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_SENTRY_DSN=your_public_sentry_dsn

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true

# Development
NODE_ENV=development
ANALYZE=false
```

## Build Steps

### Prerequisites
- Node.js 18+ and npm
- Backend API running (see backend README)

### Development Setup

1. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit .env.local with your configuration
   nano .env.local
   ```

2. **Development Server**
   ```bash
   # Start development server with hot reload
   npm run dev
   
   # Or with Turbopack (faster)
   npm run dev:turbo
   
   # With detailed logging
   npm run dev:debug
   ```

3. **Verify Installation**
   ```bash
   # Open browser
   open http://localhost:3001
   
   # Check build
   npm run build
   npm run start
   ```

### Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test types
npm run test:unit        # Jest + RTL
npm run test:e2e         # Playwright
npm run test:visual      # Visual regression

# Watch mode for development
npm run test:watch

# Update snapshots
npm run test:update-snapshots
```

### Code Quality

```bash
# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Format code
npm run format

# Pre-commit checks
npm run pre-commit
```

### Production Build

```bash
# Build for production
npm run build

# Analyze bundle size
npm run analyze

# Start production server
npm run start

# Export static site (if needed)
npm run export
```

### Docker Deployment

```bash
# Build Docker image
docker build -t aida-frontend .

# Run with Docker
docker run -p 3001:3000 aida-frontend

# Docker Compose
docker-compose up -d
```

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run dev:turbo` - Start with Turbopack
- `npm run dev:debug` - Start with debug logging

### Building
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Export static site
- `npm run analyze` - Analyze bundle size

### Testing
- `npm test` - Run all tests
- `npm run test:unit` - Unit tests only
- `npm run test:e2e` - End-to-end tests
- `npm run test:visual` - Visual regression tests
- `npm run test:coverage` - Test with coverage

### Code Quality
- `npm run lint` - ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - TypeScript check
- `npm run format` - Prettier formatting

### Utilities
- `npm run clean` - Clean build artifacts
- `npm run deps:update` - Update dependencies
- `npm run deps:audit` - Security audit

## Performance Optimization

### Bundle Optimization
- **Code Splitting**: Automatic route-based splitting
- **Dynamic Imports**: Lazy load heavy components
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Next.js font optimization

### Caching Strategy
- **API Caching**: React Query with stale-while-revalidate
- **Static Assets**: CDN caching with long TTL
- **Service Worker**: Offline capability for PWA

### Core Web Vitals
- **LCP**: Optimized images and fonts
- **FID**: Minimal JavaScript on initial load
- **CLS**: Reserved space for dynamic content

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Environment variables in Vercel dashboard
# or via vercel env command
```

## Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Check types
npm run type-check

# Restart TypeScript server in IDE
# VS Code: Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

**API Connection Issues**
```bash
# Verify backend is running
curl http://localhost:3000/health

# Check environment variables
echo $NEXT_PUBLIC_API_URL
```

**Hot Reload Not Working**
```bash
# Check file watching limits (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## Contributing

### Development Workflow
1. Create feature branch from `main`
2. Follow component and naming conventions
3. Add tests for new features
4. Update documentation
5. Submit pull request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent formatting
- **Testing**: Minimum 80% coverage
- **Accessibility**: WCAG 2.1 AA compliance

For additional support, check the [frontend documentation](docs/) or open an issue.