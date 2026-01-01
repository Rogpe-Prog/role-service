import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';

export class SampleWorker {
  private client: SQSClient;
  private running = false;

  constructor() {
    this.client = new SQSClient({ region: process.env.AWS_REGION || 'us-east-1' });
  }

  async start() {
    const queueUrl = process.env.SQS_QUEUE_URL;
    if (!queueUrl) {
      console.warn('SQS_QUEUE_URL not configured. Worker not started.');
      return;
    }
    this.running = true;
    console.log('SQS worker started, polling', queueUrl);
    while (this.running) {
      try {
        const res = await this.client.send(new ReceiveMessageCommand({
          QueueUrl: queueUrl,
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 10,
          VisibilityTimeout: 30
        }));
        const messages = res.Messages || [];
        for (const msg of messages) {
          try {
            console.log('Processing message', msg.MessageId);
            // TODO: deserializar e processar a mensagem
            // Exemplo: const payload = JSON.parse(msg.Body || '{}');
            await this.client.send(new DeleteMessageCommand({
              QueueUrl: queueUrl,
              ReceiptHandle: msg.ReceiptHandle!
            }));
            console.log('Message processed and deleted', msg.MessageId);
          } catch (procErr) {
            console.error('Error processing message', procErr);
            // optionally change visibility or move to DLQ
          }
        }
      } catch (err) {
        console.error('SQS receive error', err);
        await new Promise((r) => setTimeout(r, 5000));
      }
    }
  }

  stop() {
    this.running = false;
  }
}
