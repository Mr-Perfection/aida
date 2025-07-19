// backend/src/__tests__/ai.test.ts

import { AIService } from '../services/ai';
import { generateObject } from 'ai';

jest.mock('ai', () => ({
  generateObject: jest.fn(),
}));

const mockGenerateObject = generateObject as jest.MockedFunction<typeof generateObject>;

describe('AIService', () => {
  let aiService: AIService;

  beforeEach(() => {
    aiService = new AIService();
    jest.clearAllMocks();
  });

  test('should parse simple dinner event successfully', async () => {
    mockGenerateObject.mockResolvedValue({
      object: {
        success: true,
        event: {
          title: 'Dinner with Devin',
          dateTime: '2024-07-26T20:00:00Z',
          endDateTime: '2024-07-26T21:00:00Z',
          attendees: ['devin@email.com'],
        },
        response: '✅ Created "Dinner with Devin" for Friday 8pm',
      },
      finishReason: 'stop',
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      warnings: [],
      request: { body: '' },
      rawCall: { rawPrompt: '', rawSettings: {} },
      rawResponse: { headers: {} },
      response: { headers: {} },
    } as any);

    const result = await aiService.parseMessage('dinner with Devin at 8pm next friday');
    
    expect(result.success).toBe(true);
    expect(result.event?.title).toBe('Dinner with Devin');
    expect(result.event?.dateTime).toBe('2024-07-26T20:00:00Z');
    expect(result.response).toContain('Created');
  });

  test('should handle invalid message', async () => {
    mockGenerateObject.mockResolvedValue({
      object: {
        success: false,
        error: 'Missing event title',
        response: 'Sorry, I could not understand your message. Please include what event you want to schedule.',
      },
      finishReason: 'stop',
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      warnings: [],
      request: { body: '' },
      rawCall: { rawPrompt: '', rawSettings: {} },
      rawResponse: { headers: {} },
      response: { headers: {} },
    } as any);

    const result = await aiService.parseMessage('hello there');
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Missing event title');
    expect(result.response).toContain('could not understand');
  });

  test('should handle AI processing error', async () => {
    mockGenerateObject.mockRejectedValue(new Error('API rate limit exceeded'));

    const result = await aiService.parseMessage('dinner tomorrow');
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('AI processing failed');
    expect(result.response).toContain('could not understand your message');
  });

  test('should parse lunch with location', async () => {
    mockGenerateObject.mockResolvedValue({
      object: {
        success: true,
        event: {
          title: 'Lunch with Sarah',
          dateTime: '2024-07-25T12:00:00Z',
          endDateTime: '2024-07-25T13:00:00Z',
          location: 'Starbucks downtown',
        },
        response: '✅ Created "Lunch with Sarah" at Starbucks downtown for Thursday noon',
      },
      finishReason: 'stop',
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      warnings: [],
      request: { body: '' },
      rawCall: { rawPrompt: '', rawSettings: {} },
      rawResponse: { headers: {} },
      response: { headers: {} },
    } as any);

    const result = await aiService.parseMessage('lunch with Sarah at Starbucks downtown tomorrow at noon');
    
    expect(result.success).toBe(true);
    expect(result.event?.title).toBe('Lunch with Sarah');
    expect(result.event?.location).toBe('Starbucks downtown');
  });
});