import { BadRequestException, Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { TenantService } from "@/modules/tenant/services/tenant.service";
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
import { CreateTenantHeroDTO, UpdateTenantHeroDTO } from "@/modules/tenant/dto";

@ApiTags("Tenant Hero")
@ApiExtraModels(CreateTenantHeroDTO, UpdateTenantHeroDTO)
@Controller("hero")
export class TenantHeroController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    @ApiOperation({ summary: "Obtém os dados do hero do tenant" })
    @ApiHeader({
        name: "x-tenant-id",
        required: true,
        description: "Identificador do tenant usado para carregar o hero",
    })
    @ApiOkResponse({
        description: "Hero retornado com sucesso",
        schema: {
            oneOf: [
                { $ref: getSchemaPath(CreateTenantHeroDTO) },
                { type: "null" },
            ],
        },
    })
    @ApiBadRequestResponse({ description: "Header X-Tenant-ID ausente ou inválido" })
    getHero(@Headers("x-tenant-id") tenantId: string) {
        if (!tenantId) {
            throw new BadRequestException("Header X-Tenant-ID é obrigatório");
        }

        return this.tenantService.getHero(tenantId);
    }

    @Post()
    @ApiOperation({ summary: "Cria o hero do tenant" })
    @ApiHeader({
        name: "x-tenant-id",
        required: true,
        description: "Identificador do tenant para criar o hero",
    })
    @ApiBody({
        description: "Payload para criação de hero. Campos parciais são aceitos no schema de update.",
        schema: {
            oneOf: [
                { $ref: getSchemaPath(CreateTenantHeroDTO) },
                { $ref: getSchemaPath(UpdateTenantHeroDTO) },
            ],
        },
    })
    @ApiCreatedResponse({
        description: "Hero criado com sucesso",
        schema: { $ref: getSchemaPath(CreateTenantHeroDTO) },
    })
    @ApiBadRequestResponse({
        description: "Header X-Tenant-ID ausente ou hero já cadastrado para o tenant",
    })
    async createHero(@Headers("x-tenant-id") tenantId: string, @Body() dto: CreateTenantHeroDTO | UpdateTenantHeroDTO) {
        if (!tenantId) {
            throw new BadRequestException("Header X-Tenant-ID é obrigatório");
        }
        const existingHero = await this.tenantService.getHero(tenantId);
        if (existingHero) {
            throw new BadRequestException("Hero já existe para este tenant");
        }
        return this.tenantService.setHero(tenantId, dto);
    }
}