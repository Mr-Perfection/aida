// backend/src/services/ai.ts

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { ProcessingResult, ParsedEvent } from '../types';

const EventSchema = z.object({
  title: z.string().describe('Event title'),
  dateTime: z.string().describe('ISO 8601 datetime string'),
  endDateTime: z.string().describe('ISO 8601 end datetime string'),
  attendees: z.array(z.string()).optional().describe('Array of attendee names'),
  location: z.string().optional().describe('Event location'),
  description: z.string().optional().describe('Event description'),
});

export class AIService {
  async parseMessage(message: string): Promise<ProcessingResult> {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      
      const prompt = `
        Parse this SMS message into a calendar event. Current date: ${currentDate}
        
        Message: "${message}"
        
        Extract the event details. For relative dates like "tomorrow", "next Friday", calculate the actual date.
        Use 24-hour time format and include timezone (assume user's local timezone).
        If no end time is specified, assume 1 hour duration.
        
        If the message cannot be parsed into a valid event (missing title or date/time), 
        return an error response explaining what's missing.
      `;

      const result = await generateObject({
        model: openai('gpt-4o-mini'),
        prompt,
        schema: z.object({
          success: z.boolean(),
          event: EventSchema.optional(),
          error: z.string().optional(),
          response: z.string().describe('SMS response to send to user'),
        }),
      });

      return {
        success: result.object.success,
        event: result.object.event as ParsedEvent,
        error: result.object.error,
        response: result.object.response,
      };
    } catch (error) {
      console.error('AI parsing failed:', error);
      return {
        success: false,
        error: 'AI processing failed',
        response: 'Sorry, I could not understand your message. Please try rephrasing it like: "dinner with John tomorrow at 7pm"',
      };
    }
  }
}