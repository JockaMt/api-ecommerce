import { Injectable } from '@nestjs/common';
import { TenantRepository } from '@/modules/admin/repositories/tenant.repository';
import { CreateTenantDto } from '@/modules/admin/dto/create-tenant.dto';

@Injectable()
export class CreateTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(dto: CreateTenantDto) {

        const exists = await this.tenantRepository.findByName(dto.name);

        if (exists) {
            throw new Error('Tenant já existe');
        }

        return this.tenantRepository.create(dto);
    }
}