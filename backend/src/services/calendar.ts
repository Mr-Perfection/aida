// backend/src/services/calendar.ts

import { google } from 'googleapis';
import { ParsedEvent } from '../types';
import config from '../config';

export class CalendarService {
  private oauth2Client;
  private calendar;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      config.google.clientId,
      config.google.clientSecret,
      'http://localhost:3000/auth/google/callback'
    );

    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
  }

  async createEvent(event: ParsedEvent, userPhoneNumber: string): Promise<string> {
    try {
      const accessToken = await this.getUserAccessToken(userPhoneNumber);
      this.oauth2Client.setCredentials({ access_token: accessToken });

      // TODO: timezone will be from user preferences.
      const calendarEvent = {
        summary: event.title,
        start: {
          dateTime: event.dateTime,
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: event.endDateTime || this.calculateEndTime(event.dateTime),
          timeZone: 'America/New_York',
        },
        description: event.description,
        location: event.location,
        attendees: event.attendees?.map(email => ({ email })),
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 60 },
            { method: 'popup', minutes: 1440 },
          ],
        },
      };

      const response = await this.calendar.events.insert({
        calendarId: 'primary',
        requestBody: calendarEvent,
      });

      return response.data.id || 'unknown';
    } catch (error) {
      console.error('Failed to create calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  private async getUserAccessToken(phoneNumber: string): Promise<string> {
    throw new Error('User access token retrieval not implemented yet');
  }

  private calculateEndTime(startTime: string): string {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    return end.toISOString();
  }
}