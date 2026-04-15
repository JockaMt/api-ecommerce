import { Injectable, Inject } from '@nestjs/common';
import type { ITenantRepository } from '@/modules/tenant/repositories/interfaces';

@Injectable()
export class DeleteTenantUseCase {
    constructor(
        @Inject('ITenantRepository')
        private readonly tenantRepository: ITenantRepository
    ) { }

    async execute(id: string): Promise<{ message: string }> {
        const deleted = await this.tenantRepository.delete(id);

        if (!deleted) {
            throw new Error('Tenant não encontrado');
        }

        return { message: 'Tenant deletado com sucesso' };
    }
}
