import { Injectable, Inject } from "@nestjs/common";
import type { IHeroRepository } from "@/modules/tenant/repositories/interfaces";
import { CreateTenantHeroDTO, UpdateTenantHeroDTO } from "@/modules/tenant/dto";
import { Hero } from "@/modules/tenant/domain";

/**
 * SetHeroTenantUseCase
 * 
 * Mudança SOLID:
 * - Antes: dependia de TenantRepository
 * - Agora: depende de IHeroRepository (segregado)
 */
@Injectable()
export class SetHeroTenantUseCase {
    constructor(
        @Inject('IHeroRepository')
        private readonly heroRepository: IHeroRepository
    ) { }

    async execute(
        tenantId: string,
        dto: CreateTenantHeroDTO | UpdateTenantHeroDTO
    ): Promise<Hero> {
        // Verifica se existe e atualiza, caso contrário cria
        const existing = await this.heroRepository.findByTenantId(tenantId);
        
        if (existing) {
            return this.heroRepository.update(tenantId, dto as UpdateTenantHeroDTO);
        }
        
        return this.heroRepository.create({ ...dto, tenantId } as CreateTenantHeroDTO & { tenantId: string });
    }
}