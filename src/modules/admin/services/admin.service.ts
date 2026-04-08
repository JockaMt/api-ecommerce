import { Injectable } from "@nestjs/common";
import { CreateTenantUseCase } from "../use-cases/create-tenant.use-case";
import { CreateTenantDto } from "../dto/create-tenant.dto";
import { TenantRepository } from "../repositories/tenant.repository";

@Injectable()
export class AdminService {
    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
        private readonly tenantRepository: TenantRepository,
    ) { }

    createTenant(dto: CreateTenantDto) {
        return this.createTenantUseCase.execute(dto);
    }

    listTenants() {
        return this.tenantRepository.findAll();
    }
}