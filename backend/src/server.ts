import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

const start = async (): Promise<void> => {
  try {
    fastify.get('/', async (request, reply) => {
      return { message: 'Aida Backend API is running!' }
    })

    fastify.get('/health', async (request, reply) => {
      return { status: 'healthy', timestamp: new Date().toISOString() }
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