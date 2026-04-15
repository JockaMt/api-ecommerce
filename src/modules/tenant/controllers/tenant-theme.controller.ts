import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { TenantService } from "@/modules/tenant/services/tenant.service";
import { CreateTenantThemeDTO, UpdateTenantThemeDTO } from "@/modules/tenant/dto";
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
        name: "x-tenant-id",
        required: true,
        description: "Identificador do tenant para salvar o tema",
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
    @ApiBadRequestResponse({ description: "Header x-tenant-id ausente ou payload inválido" })
    setTheme(@Headers("x-tenant-id") tenantId: string, @Body() dto: CreateTenantThemeDTO | UpdateTenantThemeDTO) {
        return this.tenantService.setTheme(tenantId, dto);
    }

    @Get()
    @ApiOperation({ summary: "Obtém o tema do tenant" })
    @ApiHeader({
        name: "x-tenant-id",
        required: true,
        description: "Identificador do tenant para recuperar o tema",
    })
    @ApiOkResponse({ description: "Tema retornado com sucesso" })
    @ApiBadRequestResponse({ description: "Header x-tenant-id ausente ou inválido" })
    getTheme(@Headers("x-tenant-id") tenantId: string) {
        return this.tenantService.getTheme(tenantId);
    }
}