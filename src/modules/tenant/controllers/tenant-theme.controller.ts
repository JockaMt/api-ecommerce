import { Body, Controller, Get, Post } from "@nestjs/common";
import { CurrentTenant } from "@/common/tenant/current-tenant.decorator";
import { TenantService } from "@/modules/tenant/services/tenant.service";
import { CreateTenantThemeDTO, UpdateTenantThemeDTO } from "@/modules/tenant/dto";
import type { TenantContext } from "@/modules/tenant/tenant-context.type";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiHeader,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    getSchemaPath,
} from "@nestjs/swagger";

@ApiTags("Tenant Theme")
@ApiExtraModels(CreateTenantThemeDTO, UpdateTenantThemeDTO)
@Controller("theme")
export class TenantThemeController {
    constructor(private readonly tenantService: TenantService) { }

    @Post()
    @ApiOperation({ summary: "Cria ou atualiza o tema do tenant" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
    })
    @ApiBody({
        description: "Payload para criação/atualização do tema do tenant",
        schema: {
            oneOf: [
                { $ref: getSchemaPath(CreateTenantThemeDTO) },
                { $ref: getSchemaPath(UpdateTenantThemeDTO) },
            ],
        },
    })
    @ApiCreatedResponse({ description: "Tema salvo com sucesso" })
    @ApiBadRequestResponse({ description: "Host do tenant ausente ou payload invalido" })
    setTheme(@CurrentTenant() tenant: TenantContext, @Body() dto: CreateTenantThemeDTO | UpdateTenantThemeDTO) {
        return this.tenantService.setTheme(tenant.id, dto);
    }

    @Get()
    @ApiOperation({ summary: "Obtém o tema do tenant" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
    })
    @ApiOkResponse({ description: "Tema retornado com sucesso" })
    @ApiBadRequestResponse({ description: "Host do tenant ausente ou invalido" })
    getTheme(@CurrentTenant() tenant: TenantContext) {
        return this.tenantService.getTheme(tenant.id);
    }
}