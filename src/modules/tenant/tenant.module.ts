import { Module } from "@nestjs/common";
import { TenantController, UserTenantController, SetTenantThemeController } from "@/modules/tenant/controllers";
import { TenantService } from "./services/tenant.service";
import { TenantRepository } from "./repositories/tenant.repository";
import { CreateTenantUseCase, DeleteTenantUseCase, UpdateTenantUseCase } from "./use-cases";
import { PrismaService } from "../prisma/service/prisma.service";

@Module({
    imports: [],
    controllers: [TenantController, UserTenantController, SetTenantThemeController],
    providers: [
        PrismaService,
        TenantService,
        TenantRepository,
        CreateTenantUseCase,
        UpdateTenantUseCase,
        DeleteTenantUseCase,
    ],
    exports: [TenantService, TenantRepository],
})
export class TenantModule { }
