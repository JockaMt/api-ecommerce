import { BadRequestException, Controller, Get, Headers } from "@nestjs/common";
import { TenantService } from "@/modules/tenant/services/tenant.service";
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
        name: "x-tenant-id",
        required: true,
        description: "Identificador do tenant para recuperar os dados públicos",
    })
    @ApiOkResponse({ description: "Dados do tenant retornados com sucesso" })
    @ApiBadRequestResponse({ description: "Header X-Tenant-ID é obrigatório" })
    getTenantFromHeader(@Headers("x-tenant-id") tenantId?: string) {
        if (!tenantId) {
            throw new BadRequestException("Header X-Tenant-ID é obrigatório");
        }

        return this.tenantService.getCurrentTenant(tenantId);
    }
}