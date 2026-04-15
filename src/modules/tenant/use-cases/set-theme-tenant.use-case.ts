import { Injectable, Inject } from "@nestjs/common";
import { CreateTenantThemeDTO, UpdateTenantThemeDTO } from "@/modules/tenant/dto";
import type { IThemeRepository } from "@/modules/tenant/repositories/interfaces";
import { Theme } from "@/modules/tenant/domain";

/**
 * SetThemeTenantUseCase
 * 
 * Mudança SOLID:
 * - Antes: dependia de TenantRepository
 * - Agora: depende de IThemeRepository (segregado)
 */
@Injectable()
export class SetThemeTenantUseCase {
    constructor(
        @Inject('IThemeRepository')
        private readonly themeRepository: IThemeRepository
    ) { }

    async execute(
        tenantId: string,
        dto: CreateTenantThemeDTO | UpdateTenantThemeDTO
    ): Promise<Theme> {
        // Verifica se existe e atualiza, caso contrário cria
        const existing = await this.themeRepository.findByTenantId(tenantId);
        
        if (existing) {
            return this.themeRepository.update(tenantId, dto as UpdateTenantThemeDTO);
        }
        
        return this.themeRepository.create({ ...dto, tenantId } as CreateTenantThemeDTO & { tenantId: string });
    }
}