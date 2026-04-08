import { Module } from "@nestjs/common";
import { AdminController } from "./controllers/admin.controller";
import { AdminTenantsController } from "./controllers/tenant.contoller";
import { AdminService } from "./services/admin.service";
import { AdminTenantService } from "./services/tenant-service";
import { TenantRepository } from "./repositories/tenant.repository";
import { CreateTenantUseCase, DeleteTenantUseCase, UpdateTenantUseCase } from "./use-cases";

@Module({
    imports: [],
    controllers: [
        AdminController,
        AdminTenantsController,
    ],
    providers: [
        AdminService,
        AdminTenantService,
        TenantRepository,
        CreateTenantUseCase,
        UpdateTenantUseCase,
        DeleteTenantUseCase,
    ],
})
export class AdminModule { }