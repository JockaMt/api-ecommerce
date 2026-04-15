import { Controller, Get } from "@nestjs/common";
import { CurrentTenant } from "@/common/tenant/current-tenant.decorator";
import { TenantService } from "@/modules/tenant/services/tenant.service";
import type { TenantContext } from "@/modules/tenant/tenant-context.type";
import {
    ApiBadRequestResponse,
    ApiHeader,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";

@ApiTags("Tenant Public")
@Controller("tenant")
export class UserTenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    @ApiOperation({ summary: "Obtém os dados do tenant atual" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
    })
    @ApiOkResponse({ description: "Dados do tenant retornados com sucesso" })
    @ApiBadRequestResponse({ description: "Host do tenant ausente ou invalido" })
    getCurrentTenant(@CurrentTenant() tenant: TenantContext) {
        return this.tenantService.getCurrentTenant(tenant.id);
    }
}