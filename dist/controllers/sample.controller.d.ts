import { FastifyReply, FastifyRequest } from 'fastify';
import { SampleUseCase } from '@use-cases/sample.usecase';
export declare class SampleController {
    private useCase;
    constructor(useCase?: SampleUseCase);
    handle(req: FastifyRequest, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=sample.controller.d.ts.map