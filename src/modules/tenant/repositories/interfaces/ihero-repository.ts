import { Hero } from '@/modules/tenant/domain';
import { CreateTenantHeroDTO, UpdateTenantHeroDTO } from '@/modules/tenant/dto';

/**
 * Interface que define contrato para operações CRUD de Hero
 * Implementação: HeroRepository
 */
export interface IHeroRepository {
    findByTenantId(tenantId: string): Promise<Hero | null>;
    create(dto: CreateTenantHeroDTO & { tenantId: string }): Promise<Hero>;
    update(tenantId: string, dto: UpdateTenantHeroDTO): Promise<Hero>;
}
