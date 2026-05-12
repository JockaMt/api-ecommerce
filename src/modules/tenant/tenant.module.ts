import { Module } from "@nestjs/common";
import { TenantService } from "@/modules/tenant/services/tenant.service";
import { TenantRepository, TenantKeyNormalizer } from "@/modules/tenant/repositories/tenant.repository";
import { ThemeRepository } from "@/modules/tenant/repositories/theme.repository";
import { HeroRepository } from "@/modules/tenant/repositories/hero.repository";
import { FeatureRepository } from "@/modules/tenant/repositories/feature.repository";
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
    TenantHeroController,
} from "@/modules/tenant/controllers";

@Module({
    imports: [],
    controllers: [
        TenantController,
        UserTenantController,
        TenantThemeController,
        TenantHeroController,
    ],
    providers: [
        PrismaService,
        TenantKeyNormalizer,
        TenantRepository,
        ThemeRepository,
        HeroRepository,
        FeatureRepository,
        TenantService,
        // Registrar interfaces para injeção de dependência
        {
            provide: 'ITenantRepository',
            useClass: TenantRepository,
        },
        {
            provide: 'IThemeRepository',
            useClass: ThemeRepository,
        },
        {
            provide: 'IHeroRepository',
            useClass: HeroRepository,
        },
        {
            provide: 'IFeatureRepository',
            useClass: FeatureRepository,
        },
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
    exports: [
        TenantService,
        TenantRepository,
        ThemeRepository,
        HeroRepository,
        FeatureRepository,
        TenantKeyNormalizer,
        {
            provide: 'ITenantRepository',
            useClass: TenantRepository,
        },
        {
            provide: 'IThemeRepository',
            useClass: ThemeRepository,
        },
        {
            provide: 'IHeroRepository',
            useClass: HeroRepository,
        },
        {
            provide: 'IFeatureRepository',
            useClass: FeatureRepository,
        },
    ],
})
export class TenantModule { }
