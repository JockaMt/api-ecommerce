import { Injectable } from "@nestjs/common";
import {
    CreateTenantUseCase,
    DeleteTenantUseCase,
    UpdateTenantUseCase,
    GetCurrentTenantUseCase,
    GetThemeTenantUseCase,
    SetThemeTenantUseCase,
    ListTenantUseCase,
    GetHeroTenantUseCase,
    SetHeroTenantUseCase,
    GetFeaturesTenantUseCase
} from "@/modules/tenant/use-cases";
import {
    UpdateTenantDto,
    CreateTenantDto,
    CreateTenantThemeDTO,
    UpdateTenantThemeDTO,
    CreateTenantHeroDTO,
    UpdateTenantHeroDTO
} from "@/modules/tenant/dto";
import { Tenant, Theme, Hero, Feature } from "@/modules/tenant/domain";

/**
 * TenantService - Facade para orquestrar use-cases de tenant
 * 
 * Nota: Esta classe é uma facade que compõe múltiplos use-cases.
 * Idealmente, em refatorações futuras, pode ser segregado em:
 * - TenantManagementService (CRUD de tenant)
 * - TenantThemeService (CRUD de theme)
 * - TenantHeroService (CRUD de hero e features)
 */
@Injectable()
export class TenantService {
    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
        private readonly deleteTenantUseCase: DeleteTenantUseCase,
        private readonly updateTenantUseCase: UpdateTenantUseCase,
        private readonly getCurrentTenantUseCase: GetCurrentTenantUseCase,
        private readonly getThemeTenantUseCase: GetThemeTenantUseCase,
        private readonly setThemeTenantUseCase: SetThemeTenantUseCase,
        private readonly listTenantUseCase: ListTenantUseCase,
        private readonly getHeroTenantUseCase: GetHeroTenantUseCase,
        private readonly setHeroTenantUseCase: SetHeroTenantUseCase,
        private readonly getFeaturesTenantUseCase: GetFeaturesTenantUseCase

    ) { }

    async getCurrentTenant(id: string): Promise<Tenant | null> {
        return this.getCurrentTenantUseCase.execute(id);
    }

    async createTenant(dto: CreateTenantDto): Promise<Tenant> {
        return this.createTenantUseCase.execute(dto);
    }

    async listTenants(): Promise<Tenant[]> {
        return this.listTenantUseCase.execute();
    }

    async updateTenant(id: string, dto: UpdateTenantDto): Promise<Tenant> {
        return this.updateTenantUseCase.execute(id, dto);
    }

    async deleteTenant(id: string): Promise<{ message: string }> {
        return this.deleteTenantUseCase.execute(id);
    }

    async setTheme(tenantId: string, dto: CreateTenantThemeDTO | UpdateTenantThemeDTO): Promise<Theme> {
        return this.setThemeTenantUseCase.execute(tenantId, dto);
    }

    async getTheme(tenantId: string): Promise<Theme | null> {
        return this.getThemeTenantUseCase.execute(tenantId);
    }

    async getHero(tenantId: string): Promise<Hero | null> {
        return this.getHeroTenantUseCase.execute(tenantId);
    }

    async setHero(tenantId: string, dto: CreateTenantHeroDTO | UpdateTenantHeroDTO): Promise<Hero> {
        return this.setHeroTenantUseCase.execute(tenantId, dto);
    }

    async getFeatures(tenantId: string): Promise<Feature[]> {
        return this.getFeaturesTenantUseCase.execute(tenantId);
    }
}
