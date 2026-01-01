import { SampleRepository } from '@repositories/sample.repository';
export class SampleUseCase {
    constructor(repo = new SampleRepository()) {
        this.repo = repo;
    }
    async execute(payload) {
        // Regras de negócio aqui
        // payload.tenantId está disponível para decisões tenant-aware
        const created = await this.repo.save({ ...payload, createdAt: new Date() });
        return { id: created.id, ok: true };
    }
}
//# sourceMappingURL=sample.usecase.js.map