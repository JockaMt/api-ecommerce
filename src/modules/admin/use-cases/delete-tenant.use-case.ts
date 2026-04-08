import { Injectable } from '@nestjs/common';
import { TenantRepository } from '@/modules/admin/repositories/tenant.repository';

@Injectable()
export class DeleteTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(id: string) {

        const deleted = await this.tenantRepository.delete(id);

        if (!deleted) {
            throw new Error('Tenant não encontrado');
        }

        return { message: 'Tenant deletado com sucesso' };
    }
}