import { FastifyReply, FastifyRequest } from 'fastify';
import { SampleUseCase } from '@use-cases/sample.usecase';

export class SampleController {
  constructor(private useCase = new SampleUseCase()) {}

  async handle(req: FastifyRequest, reply: FastifyReply) {
    const tenantId = (req.headers['x-tenant-id'] as string) || (req as any).tenantId || 'default';
    const correlationId = (req.headers['x-correlation-id'] as string) || (req as any).correlationId || `cid-${Date.now()}`;
    const input = req.body as any;

    (req as any).requestLogger?.info?.({ correlationId, tenantId }, 'handling sample request');

    try {
      const result = await this.useCase.execute({ ...input, tenantId, correlationId });
      return reply.code(200).send(result);
    } catch (err) {
      (req as any).requestLogger?.error?.({ err }, 'sample usecase error');
      return reply.code(500).send({ message: 'Internal error' });
    }
  }
}
