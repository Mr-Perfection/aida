// backend/src/services/messageProcessor.ts

import { SQSService } from './sqs';
import { AIService } from './ai';
import { CalendarService } from './calendar';
import { TwilioService } from './twilio';
import { MessageQueueItem, ProcessingResult } from '../types';

export class MessageProcessor {
  private sqsService = new SQSService();
  private aiService = new AIService();
  private calendarService = new CalendarService();
  private twilioService = new TwilioService();

  async start(): Promise<void> {
    console.log('Starting message processor...');
    
    while (true) {
      try {
        const messages = await this.sqsService.receiveMessages(1);
        
        for (const message of messages) {
          await this.processMessage(message);
        }
      } catch (error) {
        console.error('Error in message processing loop:', error);
        await this.sleep(5000);
      }
    }
  }

  private async processMessage(message: MessageQueueItem & { receiptHandle?: string }): Promise<void> {
    try {
      console.log(`Processing message from ${message.phoneNumber}: ${message.content}`);

      const result = await this.aiService.parseMessage(message.content);
      
      if (result.success && result.event) {
        try {
          await this.calendarService.createEvent(result.event, message.phoneNumber);
          console.log(`Calendar event created for ${message.phoneNumber}`);
        } catch (calendarError) {
          console.error('Calendar creation failed:', calendarError);
          result.success = false;
          result.response = 'Sorry, I could not create the calendar event. Please try again.';
        }
      }

      await this.twilioService.sendSMS(message.phoneNumber, result.response);
      
      if (message.receiptHandle) {
        await this.sqsService.deleteMessage(message.receiptHandle);
      }
      
      console.log(`Message processed successfully for ${message.phoneNumber}`);
    } catch (error) {
      console.error(`Failed to process message from ${message.phoneNumber}:`, error);
      
      if (message.retryCount < 3) {
        console.log(`Message will be retried (attempt ${message.retryCount + 1})`);
      } else {
        console.log('Max retries reached, sending error message');
        // await this.twilioService.sendSMS(
        //   message.phoneNumber,
        //   'Sorry, it looks like something went wrong.'
        // );
        
        if (message.receiptHandle) {
          await this.sqsService.deleteMessage(message.receiptHandle);
        }
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}