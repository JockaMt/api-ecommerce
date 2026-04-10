import { Injectable } from "@nestjs/common";
import { CreateTenantUseCase, DeleteTenantUseCase, UpdateTenantUseCase } from "@/modules/tenant/use-cases";
import { TenantRepository } from "@/modules/tenant/repositories/tenant.repository";
import { UpdateTenantDto, CreateTenantDto, CreateTenantThemeDTO, UpdateTenantThemeDTO } from "@/modules/tenant/dto";

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

    setTheme(tenantId: string, dto: CreateTenantThemeDTO | UpdateTenantThemeDTO) {
        return this.tenantRepository.setTheme(tenantId, dto);
    }

    getTheme(tenantId: string) {
        return this.tenantRepository.getTheme(tenantId);
    }
}
