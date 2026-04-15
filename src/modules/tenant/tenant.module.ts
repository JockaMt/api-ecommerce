import { Module } from "@nestjs/common";
import { TenantService } from "@/modules/tenant/services/tenant.service";
import { TenantRepository } from "@/modules/tenant/repositories/tenant.repository";
import { PrismaService } from "@/modules/prisma/service/prisma.service";
import {
    CreateTenantUseCase,
    DeleteTenantUseCase,
    GetCurrentTenantUseCase,
    UpdateTenantUseCase,
    GetThemeTenantUseCase,
    SetThemeTenantUseCase,
    ListTenantUseCase,
    GetHeroTenantUseCase,
    GetFeaturesTenantUseCase,
    SetHeroTenantUseCase
} from "@/modules/tenant/use-cases";
import {
    TenantController,
    UserTenantController,
    TenantThemeController,
    TenantHeroController
} from "@/modules/tenant/controllers";

@Module({
    imports: [],
    controllers: [
        TenantController,
        UserTenantController,
        TenantThemeController,
        TenantHeroController
    ],
    providers: [
        PrismaService,
        TenantService,
        TenantRepository,
        CreateTenantUseCase,
        UpdateTenantUseCase,
        DeleteTenantUseCase,
        GetCurrentTenantUseCase,
        GetThemeTenantUseCase,
        SetThemeTenantUseCase,
        ListTenantUseCase,
        GetHeroTenantUseCase,
        GetFeaturesTenantUseCase,
        SetHeroTenantUseCase
    ],
    exports: [TenantService, TenantRepository],
})
export class TenantModule { }
