import { Injectable } from "@nestjs/common";
import { TenantRepository } from "@/modules/tenant/repositories/tenant.repository";

@Injectable()
export class GetThemeTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(tenantId: string) {
        return this.tenantRepository.getTheme(tenantId);
    }
}