import { Controller, Get, Param } from "@nestjs/common";
import { TenantService } from "../services/tenant.service";

@Controller("tenant")
export class UserTenantController {
    constructor (private readonly tenantService: TenantService) { }

    @Get()
    getTenant(@Param(":id") id: string) {
        return this.tenantService.getCurrentTenant(id);
    }
}