import { BadRequestException, Injectable, Inject } from "@nestjs/common";
import type { ITenantRepository } from "@/modules/tenant/repositories/interfaces";
import { Tenant } from "@/modules/tenant/domain";

@Injectable()
export class GetCurrentTenantUseCase {
    constructor(
        @Inject('ITenantRepository')
        private readonly tenantRepository: ITenantRepository
    ) { }

    async execute(id: string): Promise<Tenant | null> {
        if (!id) {
            throw new BadRequestException("Tenant ID é obrigatório");
        }

        return this.tenantRepository.findById(id);
    }
}