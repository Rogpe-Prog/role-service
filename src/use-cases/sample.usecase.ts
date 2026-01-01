import { SampleRepository } from '@repositories/sample.repository';

export class SampleUseCase {
  constructor(private repo = new SampleRepository()) {}

  async execute(payload: any) {
    // Regras de negócio aqui
    // payload.tenantId está disponível para decisões tenant-aware
    const created = await this.repo.save({ ...payload, createdAt: new Date() });
    return { id: created.id, ok: true };
  }
}
