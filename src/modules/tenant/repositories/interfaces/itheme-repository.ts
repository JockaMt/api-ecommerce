import { Theme } from '@/modules/tenant/domain';
import { CreateTenantThemeDTO, UpdateTenantThemeDTO } from '@/modules/tenant/dto';

/**
 * Interface que define contrato para operações CRUD de Theme
 * Implementação: ThemeRepository
 */
export interface IThemeRepository {
    findByTenantId(tenantId: string): Promise<Theme | null>;
    create(dto: CreateTenantThemeDTO & { tenantId: string }): Promise<Theme>;
    update(tenantId: string, dto: UpdateTenantThemeDTO): Promise<Theme>;
}
