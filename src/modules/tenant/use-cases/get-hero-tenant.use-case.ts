import { Injectable, Inject } from "@nestjs/common";
import type { IHeroRepository } from "@/modules/tenant/repositories/interfaces";
import { Hero } from "@/modules/tenant/domain";

/**
 * GetHeroTenantUseCase
 * 
 * Mudança SOLID:
 * - Antes: dependia de TenantRepository
 * - Agora: depende de IHeroRepository (segregado)
 */
@Injectable()
export class GetHeroTenantUseCase {
    constructor(
        @Inject('IHeroRepository')
        private readonly heroRepository: IHeroRepository
    ) { }

    async execute(tenantId: string): Promise<Hero | null> {
        return this.heroRepository.findByTenantId(tenantId);
    }
}