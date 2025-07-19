// backend/src/services/twilio.ts

import twilio from 'twilio';
import config from '../config';

export class TwilioService {
  private client;

  constructor() {
    this.client = twilio(config.twilio.accountSid, config.twilio.authToken);
  }

  async sendSMS(to: string, message: string): Promise<void> {
    try {
      const result = await this.client.messages.create({
        body: message,
        from: config.twilio.phoneNumber,
        to: to,
      });

      console.log(`SMS sent to ${to}: ${result.sid}`);
    } catch (error) {
      console.error(`Failed to send SMS to ${to}:`, error);
      throw error;
    }
  }
}