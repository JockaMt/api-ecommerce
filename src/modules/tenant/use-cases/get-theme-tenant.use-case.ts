import { Injectable, Inject } from "@nestjs/common";
import type { IThemeRepository } from "@/modules/tenant/repositories/interfaces";
import { Theme } from "@/modules/tenant/domain";

/**
 * GetThemeTenantUseCase
 * 
 * Mudança SOLID:
 * - Antes: dependia de TenantRepository
 * - Agora: depende de IThemeRepository (segregado)
 */
@Injectable()
export class GetThemeTenantUseCase {
    constructor(
        @Inject('IThemeRepository')
        private readonly themeRepository: IThemeRepository
    ) { }

    async execute(tenantId: string): Promise<Theme | null> {
        return this.themeRepository.findByTenantId(tenantId);
    }
}