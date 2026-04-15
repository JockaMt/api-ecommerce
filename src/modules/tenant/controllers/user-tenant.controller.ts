import { BadRequestException, Controller, Get, Headers, Param } from "@nestjs/common";
import { TenantService } from "@/modules/tenant/services/tenant.service";

@Controller("tenant")
export class UserTenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    getTenantFromHeader(@Headers("x-tenant-id") tenantId?: string) {
        if (!tenantId) {
            throw new BadRequestException("Header X-Tenant-ID é obrigatório");
        }

        return this.tenantService.getCurrentTenant(tenantId);
    }

    @Get(":id")
    getTenantById(@Param("id") id: string) {
        if (!id) {
            throw new BadRequestException("Parâmetro id é obrigatório");
        }

        return this.tenantService.getCurrentTenant(id);
    }
}