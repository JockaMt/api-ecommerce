import { Module } from "@nestjs/common";
import { TenantController } from "./controllers/tenant.controller";
import { TenantService } from "./services/tenant.service";
import { TenantRepository } from "./repositories/tenant.repository";
import { CreateTenantUseCase, DeleteTenantUseCase, UpdateTenantUseCase } from "./use-cases";
import { UserTenantController } from "./controllers/user-tenant.controller";

@Module({
    imports: [],
    controllers: [TenantController, UserTenantController],
    providers: [
        TenantService,
        TenantRepository,
        CreateTenantUseCase,
        UpdateTenantUseCase,
        DeleteTenantUseCase,
    ],
    exports: [TenantService, TenantRepository],
})
export class TenantModule { }
