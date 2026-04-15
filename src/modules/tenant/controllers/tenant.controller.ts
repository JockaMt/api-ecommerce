import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { CurrentTenant } from "@/common/tenant/current-tenant.decorator";
import { TenantService } from "@/modules/tenant/services/tenant.service";
import { CreateTenantDto } from "@/modules/tenant/dto/create-tenant.dto";
import { UpdateTenantDto } from "@/modules/tenant/dto/update-tenant.dto";
import type { TenantContext } from "@/modules/tenant/tenant-context.type";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiHeader,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";

@ApiTags("Tenant Admin")
@Controller('admin/tenants')
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    @ApiOperation({ summary: "Lista todos os tenants" })
    @ApiOkResponse({ description: "Lista de tenants retornada com sucesso" })
    listTenants() {
        return this.tenantService.listTenants();
    }

    @Post()
    @ApiOperation({ summary: "Cria um novo tenant" })
    @ApiBody({ type: CreateTenantDto, description: "Dados para criação do tenant" })
    @ApiCreatedResponse({ description: "Tenant criado com sucesso" })
    @ApiBadRequestResponse({ description: "Dados inválidos para criação do tenant" })
    createTenant(@Body() dto: CreateTenantDto) {
        return this.tenantService.createTenant(dto);
    }

    @Put()
    @ApiOperation({ summary: "Atualiza um tenant existente" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
    })
    @ApiBody({ type: UpdateTenantDto, description: "Dados para atualização parcial do tenant" })
    @ApiOkResponse({ description: "Tenant atualizado com sucesso" })
    @ApiBadRequestResponse({ description: "Host do tenant ausente ou payload invalido" })
    updateTenant(@CurrentTenant() tenant: TenantContext, @Body() dto: UpdateTenantDto) {
        return this.tenantService.updateTenant(tenant.id, dto);
    }

    @Delete()
    @ApiOperation({ summary: "Remove um tenant" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
    })
    @ApiOkResponse({ description: "Tenant removido com sucesso" })
    @ApiBadRequestResponse({ description: "Host do tenant ausente ou invalido" })
    deleteTenant(@CurrentTenant() tenant: TenantContext) {
        return this.tenantService.deleteTenant(tenant.id);
    }
}
