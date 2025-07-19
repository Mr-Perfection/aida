// backend/src/types/index.ts

export interface SMSMessage {
  from: string;
  to: string;
  body: string;
  messageSid: string;
  timestamp: string;
}

export interface ParsedEvent {
  title: string;
  dateTime: string;
  endDateTime?: string;
  attendees?: string[];
  location?: string;
  description?: string;
}

export interface ProcessingResult {
  success: boolean;
  event?: ParsedEvent;
  error?: string;
  response: string;
}

export interface MessageQueueItem {
  messageId: string;
  phoneNumber: string;
  content: string;
  timestamp: string;
  retryCount: number;
}

export interface Config {
  twilio: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  };
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    sqsQueueUrl: string;
  };
  openai: {
    apiKey: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
  };
}