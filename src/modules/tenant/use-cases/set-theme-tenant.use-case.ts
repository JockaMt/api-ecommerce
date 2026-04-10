import { Injectable } from "@nestjs/common";
import { CreateTenantThemeDTO, UpdateTenantThemeDTO } from "@/modules/tenant/dto";
import { TenantRepository } from "@/modules/tenant/repositories/tenant.repository";

@Injectable()
export class SetThemeTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(tenantId: string, theme: CreateTenantThemeDTO | UpdateTenantThemeDTO) {
        const existingTheme = await this.tenantRepository.getTheme(tenantId);

        if (existingTheme) {
            return this.tenantRepository.updateTheme(existingTheme.id, theme);
        } else {
            return this.tenantRepository.createTheme({ ...theme, tenantId });
        }
    }
}