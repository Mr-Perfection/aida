# CLAUDE.md

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

### Abuse prevention
- Set up analytics on how much user is consuming tokens/cost for AI system