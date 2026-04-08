import { Injectable } from "@nestjs/common";
import { CreateTenantUseCase, DeleteTenantUseCase, UpdateTenantUseCase } from "../use-cases";
import { CreateTenantDto } from "../dto/create-tenant.dto";
import { TenantRepository } from "../repositories/tenant.repository";
import { UpdateTenantDto } from "../dto/update-tenant.dto";

@Injectable()
export class TenantService {
    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
        private readonly tenantRepository: TenantRepository,
        private readonly deleteTenantUseCase: DeleteTenantUseCase,
        private readonly updateTenantUseCase: UpdateTenantUseCase,
    ) { }

    getCurrentTenant(id: string) {
        return this.tenantRepository.findById(id);
    }

    createTenant(dto: CreateTenantDto) {
        return this.createTenantUseCase.execute(dto);
    }

    listTenants() {
        return this.tenantRepository.findAll();
    }

    updateTenant(id: string, dto: UpdateTenantDto) {
        return this.updateTenantUseCase.execute(id, dto);
    }

    deleteTenant(id: string) {
        return this.deleteTenantUseCase.execute(id);
    }
}
