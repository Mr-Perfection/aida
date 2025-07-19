import Fastify from 'fastify'
import { webhookRoutes } from './routes/webhook'
import { MessageProcessor } from './services/messageProcessor'

const fastify = Fastify({ logger: true })

const start = async (): Promise<void> => {
  try {
    await fastify.register(require('@fastify/formbody'))
    
    fastify.get('/', async (request, reply) => {
      return { message: 'Aida Backend API is running!' }
    })

    fastify.get('/health', async (request, reply) => {
      return { status: 'healthy', timestamp: new Date().toISOString() }
    })

    await fastify.register(webhookRoutes)

    const messageProcessor = new MessageProcessor()
    messageProcessor.start().catch(error => {
      console.error('Message processor error:', error)
    })

    const port = process.env.PORT ? parseInt(process.env.PORT) : 3001
    await fastify.listen({ port, host: '0.0.0.0' })
    console.log(`Server running on port ${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()