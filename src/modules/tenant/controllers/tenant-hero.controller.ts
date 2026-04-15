import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { CurrentTenant } from "@/common/tenant/current-tenant.decorator";
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
import type { TenantContext } from "@/modules/tenant/tenant-context.type";

@ApiTags("Tenant Hero")
@ApiExtraModels(CreateTenantHeroDTO, UpdateTenantHeroDTO)
@Controller("hero")
export class TenantHeroController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    @ApiOperation({ summary: "Obtém os dados do hero do tenant" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
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
    @ApiBadRequestResponse({ description: "Host do tenant ausente ou invalido" })
    getHero(@CurrentTenant() tenant: TenantContext) {
        return this.tenantService.getHero(tenant.id);
    }

    @Post()
    @ApiOperation({ summary: "Cria o hero do tenant" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
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
        description: "Host do tenant ausente ou hero ja cadastrado para o tenant",
    })
    async createHero(@CurrentTenant() tenant: TenantContext, @Body() dto: CreateTenantHeroDTO | UpdateTenantHeroDTO) {
        const existingHero = await this.tenantService.getHero(tenant.id);
        if (existingHero) {
            throw new BadRequestException("Hero já existe para este tenant");
        }
        return this.tenantService.setHero(tenant.id, dto);
    }
}