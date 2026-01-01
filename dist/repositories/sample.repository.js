export class SampleRepository {
    async save(entity) {
        // Exemplo: persistir em DB; aqui apenas simula
        const record = { id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, ...entity };
        return record;
    }
}
//# sourceMappingURL=sample.repository.js.map