# Backend

### Overview
This is the core API service for the AI Personal Assistant that helps users manage their calendars via SMS. It provides cost-optimized AI processing, Google Calendar integration, and real-time message handling through a production-ready architecture.

## Features

### Core Features
- **SMS-based Interface**: Process incoming SMS messages via Twilio webhooks
- **AI-Powered Processing**: Multi-tiered AI cost-efficient system
  - Rule-based processing (60% of messages - free)
  - Cheap AI extraction with GPT-4o-mini (30% of messages)
  - Premium AI for complex scenarios (10% of messages)
- **Google Calendar Integration**: Full CRUD operations with OAuth 2.0
- **Smart Message Batching**: Process related messages together for efficiency
- **Configurable Reminders**: User-defined reminder times (e.g., 1 day + 1 hour before)
- **Phone-based Invitations**: Support both Aida users and non-users

### Authentication & Security
- **Phone OTP Authentication**: SMS-based user verification
- **Google OAuth 2.0**: Secure calendar access with token refresh
- **JWT Sessions**: Secure API authentication
- **Rate Limiting**: Prevent abuse and control costs
- **Input Validation**: Comprehensive request validation with Zod

### Performance & Reliability
- **Redis Clustering**: High-availability caching and queuing
- **Message Queue**: Reliable processing with Bull/BullMQ
- **Graceful Degradation**: Continues working even if cache/queue fails
- **Circuit Breaker**: Automatic failover for external services
- **Retry Logic**: Exponential backoff for failed operations

### Administrative Features
- **Waitlist Management**: Manual user approval system
- **Admin Dashboard API**: User management

## Technologies

### Core Stack
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL 15+ (primary data)
- **Cache/Queue**: Redis 7+ (clustering support)
- **Queue System**: Bull/BullMQ for job processing

### External Integrations
- **AI Services**: 
  - OpenAI GPT-4o-mini (primary)
  - Anthropic Claude-3-haiku (fallback)
  - OpenAI GPT-4o (complex scenarios)
- **SMS**: Twilio API
- **Calendar**: Google Calendar API
- **Authentication**: Google OAuth 2.0

### DevOps & Monitoring
- **Containerization**: Docker with multi-stage builds
- **Monitoring**: DataDog integration
- **Logging**: Winston with structured logging
- **Documentation**: OpenAPI/Swagger
- **Testing**: Jest with supertest
- **Linting**: ESLint + Prettier