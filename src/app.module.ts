import { Module } from '@nestjs/common';
import { AdminTenantsController } from '@/modules/admin/controllers/tenant.contoller';
import { AdminController } from './modules/admin/controllers/admin.controller';
import { AdminService } from './modules/admin/services/admin.service';
import { CreateTenantUseCase } from './modules/admin/use-cases/create-tenant.use-case';
import { TenantRepository } from './modules/admin/repositories/tenant.repository';

@Module({
  imports: [],
  controllers: [AdminController, AdminTenantsController],
  providers: [AdminService, CreateTenantUseCase, TenantRepository],
})
export class AppModule { }
