import { Injectable } from "@nestjs/common";
import { CreateTenantThemeDTO, UpdateTenantThemeDTO } from "@/modules/tenant/dto";
import { TenantRepository } from "@/modules/tenant/repositories/tenant.repository";

@Injectable()
export class SetThemeTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(tenantId: string, dto: CreateTenantThemeDTO | UpdateTenantThemeDTO) {
        return this.tenantRepository.createTheme({ ...dto, tenantId });
    }
}