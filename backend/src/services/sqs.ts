// backend/src/services/sqs.ts

import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import crypto from 'crypto';
import config from '../config';
import { MessageQueueItem } from '../types';

const sqsClient = new SQSClient({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

export class SQSService {
  private queueUrl = config.aws.sqsQueueUrl;

  async sendMessage(phoneNumber: string, content: string, timestamp: string): Promise<void> {
    const messageDeduplicationId = crypto
      .createHash('sha256')
      .update(`${phoneNumber}${timestamp}`)
      .digest('hex');

    const messageBody: MessageQueueItem = {
      messageId: messageDeduplicationId,
      phoneNumber,
      content,
      timestamp,
      retryCount: 0,
    };

    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(messageBody),
      MessageGroupId: phoneNumber,
      MessageDeduplicationId: messageDeduplicationId,
    });

    try {
      await sqsClient.send(command);
      console.log(`Message sent to SQS for ${phoneNumber}`);
    } catch (error) {
      console.error('Failed to send message to SQS:', error);
      throw error;
    }
  }

  async receiveMessages(maxMessages = 1): Promise<MessageQueueItem[]> {
    const command = new ReceiveMessageCommand({
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: maxMessages,
      WaitTimeSeconds: 20,
      VisibilityTimeout: 300,
    });

    try {
      const response = await sqsClient.send(command);
      const messages = response.Messages || [];
      
      return messages.map(msg => ({
        ...JSON.parse(msg.Body || '{}'),
        receiptHandle: msg.ReceiptHandle,
      }));
    } catch (error) {
      console.error('Failed to receive messages from SQS:', error);
      return [];
    }
  }

  async deleteMessage(receiptHandle: string): Promise<void> {
    const command = new DeleteMessageCommand({
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    });

    try {
      await sqsClient.send(command);
      console.log('Message deleted from SQS');
    } catch (error) {
      console.error('Failed to delete message from SQS:', error);
      throw error;
    }
  }
}