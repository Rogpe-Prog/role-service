import { SampleUseCase } from '@use-cases/sample.usecase';
export class SampleController {
    constructor(useCase = new SampleUseCase()) {
        this.useCase = useCase;
    }
    async handle(req, reply) {
        const tenantId = req.headers['x-tenant-id'] || req.tenantId || 'default';
        const correlationId = req.headers['x-correlation-id'] || req.correlationId || `cid-${Date.now()}`;
        const input = req.body;
        req.requestLogger?.info?.({ correlationId, tenantId }, 'handling sample request');
        try {
            const result = await this.useCase.execute({ ...input, tenantId, correlationId });
            return reply.code(200).send(result);
        }
        catch (err) {
            req.requestLogger?.error?.({ err }, 'sample usecase error');
            return reply.code(500).send({ message: 'Internal error' });
        }
    }
}
//# sourceMappingURL=sample.controller.js.map