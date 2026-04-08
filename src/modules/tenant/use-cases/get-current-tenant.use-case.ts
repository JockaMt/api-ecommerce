import { Injectable } from "@nestjs/common";
import { TenantRepository } from "@/modules/tenant/repositories/tenant.repository";

@Injectable()
export class GetCurrentTenant {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(id: string) {
        return this.tenantRepository.findById(id);
    }
}