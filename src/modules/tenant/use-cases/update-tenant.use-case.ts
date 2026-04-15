import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import type { ITenantRepository } from "@/modules/tenant/repositories/interfaces";
import { UpdateTenantDto } from "@/modules/tenant/dto";
import { Tenant } from "@/modules/tenant/domain";

@Injectable()
export class UpdateTenantUseCase {
    constructor(
        @Inject('ITenantRepository')
        private readonly tenantRepository: ITenantRepository
    ) { }

    async execute(id: string, dto: UpdateTenantDto): Promise<Tenant> {
        const tenant = await this.tenantRepository.findById(id);
        if (!tenant) {
            throw new NotFoundException('Tenant não encontrado');
        }

        return this.tenantRepository.update(id, dto);
    }
}
