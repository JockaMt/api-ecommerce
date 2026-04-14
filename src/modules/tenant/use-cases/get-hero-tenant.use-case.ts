import { Injectable } from "@nestjs/common";
import { TenantRepository } from "@/modules/tenant/repositories/tenant.repository";

@Injectable()
export class GetHeroTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(tenantId: string) {
        // Lógica para obter o "herói" do tenant, por exemplo, um produto ou categoria em destaque
        return this.tenantRepository.getHero(tenantId);
    }
}