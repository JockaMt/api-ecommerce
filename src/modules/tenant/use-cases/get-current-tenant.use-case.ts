import { BadRequestException, Injectable } from "@nestjs/common";
import { TenantRepository } from "@/modules/tenant/repositories/tenant.repository";

@Injectable()
export class GetCurrentTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(id: string) {
        if (!id) {
            throw new BadRequestException("Tenant ID é obrigatório");
        }

        return this.tenantRepository.findById(id);
    }
}