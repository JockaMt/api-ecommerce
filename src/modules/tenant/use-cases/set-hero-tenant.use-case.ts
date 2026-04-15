import { Injectable } from "@nestjs/common";
import { TenantRepository } from "@/modules/tenant/repositories/tenant.repository";
import { CreateTenantHeroDTO, UpdateTenantHeroDTO } from "@/modules/tenant/dto";

@Injectable()
export class SetHeroTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(tenantId: string, dto: CreateTenantHeroDTO | UpdateTenantHeroDTO) {
        // Lógica para definir o "herói" do tenant, por exemplo, um produto ou categoria em destaque
        return this.tenantRepository.setHero(tenantId, dto);
    }
}