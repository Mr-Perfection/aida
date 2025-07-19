// backend/src/routes/webhook.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { SQSService } from '../services/sqs';
import { SMSMessage } from '../types';

interface TwilioWebhookBody {
  From: string;
  To: string;
  Body: string;
  MessageSid: string;
  [key: string]: any;
}

const sqsService = new SQSService();

export async function webhookRoutes(fastify: FastifyInstance) {
  fastify.post('/webhook/sms', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as TwilioWebhookBody;
      
      const smsMessage: SMSMessage = {
        from: body.From,
        to: body.To,
        body: body.Body,
        messageSid: body.MessageSid,
        timestamp: new Date().toISOString(),
      };

      await sqsService.sendMessage(
        smsMessage.from,
        smsMessage.body,
        smsMessage.timestamp
      );

      reply.type('text/xml').send(`
        <?xml version="1.0" encoding="UTF-8"?>
        <Response></Response>
      `);
    } catch (error) {
      console.error('Webhook error:', error);
      reply.status(500).send({ error: 'Internal server error' });
    }
  });

  fastify.get('/webhook/health', async (request: FastifyRequest, reply: FastifyReply) => {
    return { status: 'webhook healthy', timestamp: new Date().toISOString() };
  });
}