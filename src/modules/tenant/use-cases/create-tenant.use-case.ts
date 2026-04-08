import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { TenantRepository } from '@/modules/tenant/repositories/tenant.repository';
import { CreateTenantDto } from '@/modules/tenant/dto/create-tenant.dto';

@Injectable()
export class CreateTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(dto: CreateTenantDto) {

        const exists = await this.tenantRepository.findByName(dto.name);

        if (exists) {
            Logger.error("Uma empresa com esse nome já foi cadastrada.", "CreateTenantUseCase");
            throw new ConflictException("Uma empresa com esse nome já foi cadastrada.");
        }

        return this.tenantRepository.create(dto);
    }
}
