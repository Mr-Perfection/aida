# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aida is an AI Personal Assistant designed to help organize people's lives by managing their Google Calendar through SMS interactions. Think of it as an executive assistant accessible to everyone, starting with calendar management and expanding to other use cases in the future.

## Core Features (MVP)

### Waitlist Management
- Add users to waitlist with manual approval system
- Admin dashboard for user approval workflow

### User Onboarding
- Phone number-based signup with 2-factor authentication (SMS OTP)
- Google OAuth integration for Calendar and Contacts access
- User preference configuration (default: 1 day + 1 hour before events)

### SMS-Based Scheduling
- Users schedule events via text messages to Aida
- AI processes requests and manages Google Calendar
- Smart guest invitation system:
  - For Aida users: Google Calendar invites sent directly
  - For non-users: SMS notifications sent
- Configurable reminder system based on user preferences
- Preference updates via SMS commands

## Architecture Requirements

### Cost Optimization
- Multi-tiered AI processing pipeline to minimize inference costs:
  1. Rule-based processing for simple patterns (cheapest)
  2. Lightweight models for basic extraction tasks  
  3. Premium models only for complex scenarios
- Start with cheapest capable model providers
- Implement model fallbacks (e.g., OpenAI → Anthropic)

### Reliability & Fault Tolerance
- **Critical**: No Redis for message processing (delivery guarantees required)
- Implement retries with exponential backoff
- API timeout handling and circuit breaker patterns
- Graceful degradation when external services fail
- Database-backed message queuing for reliability

### Monitoring & Performance
- Track user metrics and engagement
- Monitor AI processing costs and optimization effectiveness
- Performance monitoring for SMS response times
- Error tracking and alerting

## Project Structure

The project follows a monorepo structure:
- `frontend/` - Admin dashboard and user portal (Next.js in Typescript)
- `backend/` - API service with SMS processing (Node.js/Fastify in Typescript)

### Frontend (Next.js Application)
- Admin dashboard for waitlist management
- User onboarding flow with Google OAuth
- User preference management interface
- Responsive design with mobile-first approach

### Backend (Node.js API Service)
- SMS webhook handling via Twilio
- AI-powered message processing pipeline
- Google Calendar API integration
- User authentication and session management
- Database operations (PostgreSQL recommended)

## Development Guidelines

### Message Processing Architecture
- Use database-backed queuing instead of Redis for message reliability
- Implement idempotent message processing
- Handle SMS webhook retries properly
- Ensure message delivery guarantees

### AI Processing Optimization
- Implement tiered processing: rules → cheap AI → premium AI
- Cache common patterns and responses
- Monitor token usage and costs per user
- Implement model fallback chains

### Security Considerations
- Secure SMS webhook endpoints
- Protect Google OAuth tokens
- Implement rate limiting for SMS endpoints
- Validate and sanitize all user inputs

### Testing Strategy
- Unit tests for AI processing logic
- Integration tests for SMS workflows
- End-to-end tests for calendar operations
- Load testing for SMS volume handling

## Key Integration Points

### Twilio SMS
- Webhook endpoints for incoming messages
- Outbound messaging for notifications and invites
- Phone number verification for 2FA

### Google APIs
- Calendar API for event CRUD operations
- OAuth 2.0 for secure access
- Contacts API for guest management

### AI Services
- Primary: Cost-effective model providers
- Fallback: Alternative providers for reliability
- Processing pipeline: Rule-based → Basic AI → Advanced AI

## Deployment Considerations

- Environment separation (dev/staging/prod)
- Database migrations and backup strategies
- SMS webhook URL configuration
- Google OAuth callback URL setup
- Monitoring and alerting setup
- Cost tracking and budgeting for AI services

The system prioritizes cost efficiency, reliability, and user experience while maintaining the simplicity of SMS-based interaction for calendar management.

## Code Quality Guidelines

### Verify Information
Always verify information before presenting it. Do not make assumptions or speculate without clear evidence.s.

### Latest package versions
Always try to use the latest package versions.

### IMPLEMENT PROGRESSIVELY
- First break tasks into distinct prioritized steps, then follow the steps
- Pause after each component to check alignment
- Confirm understanding before starting
- Follow best practices, lean towards agile methodologies
- Prioritize modularity, DRY, performance, and security

### MANAGE SCOPE
- Choose minimal viable interpretation when ambiguous
- Ask before modifying components not mentioned

### COMMUNICATE CLEARLY
- Summarize after each component
- Outline plans before major changes

### ENSURE QUALITY
- Provide testable increments
- Include usage examples
- Note edge cases and limitations
- Suggest verification tests

### Comments
- Don't comment on what the code does - make the code self-documenting
- Use comments to explain why something is done a certain way
- Comments should be created where the operation isn't clear from the code, or where uncommon libraries are used
- Code must start with path/filename as a one-line comment
- Comments should describe purpose, not effect
- Document APIs, complex algorithms, and non-obvious side effects

### Constants Over Magic Numbers
- Replace hard-coded values with named constants
- Use descriptive constant names that explain the value's purpose
- Keep constants at the top of the file or in a dedicated constants file

### Meaningful Names
- Variables, functions, and classes should reveal their purpose
- Names should explain why something exists and how it's used
- Avoid abbreviations unless they're universally understood

### Clean Structure
- Keep related code together
- Organize code in a logical hierarchy
- Use consistent file and folder naming conventions

### Encapsulation
- Hide implementation details
- Expose clear interfaces
- Move nested conditionals into well-named functions

### Code Quality Maintenance
- Refactor continuously
- Fix technical debt early
- Leave code cleaner than you found it

### Testing
- Write tests before fixing bugs
- Keep tests readable and maintainable
- Test edge cases and error conditions
