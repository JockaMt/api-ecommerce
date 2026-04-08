import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantRepository } from "../repositories/tenant.repository";

@Injectable()
export class UpdateTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(id: string, dto: any) {

        const tenant = await this.tenantRepository.findById(id);
        if (!tenant) {
            throw new NotFoundException('Tenant não encontrado');
        }

        return this.tenantRepository.update(id, dto);
    }

}
