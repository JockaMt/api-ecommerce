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
    GetFeaturesTenantUseCase,
} from "@/modules/tenant/use-cases";
import {
    UpdateTenantDto,
    CreateTenantDto,
    CreateTenantThemeDTO,
    UpdateTenantThemeDTO
} from "@/modules/tenant/dto";

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
        private readonly getFeaturesTenantUseCase: GetFeaturesTenantUseCase

    ) { }

    getCurrentTenant(id: string) {
        return this.getCurrentTenantUseCase.execute(id);
    }

    createTenant(dto: CreateTenantDto) {
        return this.createTenantUseCase.execute(dto);
    }

    listTenants() {
        return this.listTenantUseCase.execute();
    }

    updateTenant(id: string, dto: UpdateTenantDto) {
        return this.updateTenantUseCase.execute(id, dto);
    }

    deleteTenant(id: string) {
        return this.deleteTenantUseCase.execute(id);
    }

    setTheme(tenantId: string, dto: CreateTenantThemeDTO | UpdateTenantThemeDTO) {
        return this.setThemeTenantUseCase.execute(tenantId, dto);
    }

    getTheme(tenantId: string) {
        return this.getThemeTenantUseCase.execute(tenantId);
    }

    getHero(tenantId: string) {
        return this.getHeroTenantUseCase.execute(tenantId);
    }

    getFeatures(tenantId: string) {
        return this.getFeaturesTenantUseCase.execute(tenantId);
    }
}
