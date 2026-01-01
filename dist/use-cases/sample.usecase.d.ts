import { SampleRepository } from '@repositories/sample.repository';
export declare class SampleUseCase {
    private repo;
    constructor(repo?: SampleRepository);
    execute(payload: any): Promise<{
        id: any;
        ok: boolean;
    }>;
}
//# sourceMappingURL=sample.usecase.d.ts.map