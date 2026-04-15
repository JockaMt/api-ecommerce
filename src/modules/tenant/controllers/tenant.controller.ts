import { Body, Controller, Delete, Get, Headers, Post, Put } from "@nestjs/common";
import { TenantService } from "@/modules/tenant/services/tenant.service";
import { CreateTenantDto } from "@/modules/tenant/dto/create-tenant.dto";
import { UpdateTenantDto } from "@/modules/tenant/dto/update-tenant.dto";
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
        name: "x-tenant-id",
        required: true,
        description: "Identificador do tenant a ser atualizado",
    })
    @ApiBody({ type: UpdateTenantDto, description: "Dados para atualização parcial do tenant" })
    @ApiOkResponse({ description: "Tenant atualizado com sucesso" })
    @ApiBadRequestResponse({ description: "Header x-tenant-id ausente ou payload inválido" })
    updateTenant(@Headers("x-tenant-id") id: string, @Body() dto: UpdateTenantDto) {
        return this.tenantService.updateTenant(id, dto);
    }

    @Delete()
    @ApiOperation({ summary: "Remove um tenant" })
    @ApiHeader({
        name: "x-tenant-id",
        required: true,
        description: "Identificador do tenant a ser removido",
    })
    @ApiOkResponse({ description: "Tenant removido com sucesso" })
    @ApiBadRequestResponse({ description: "Header x-tenant-id ausente ou inválido" })
    deleteTenant(@Headers("x-tenant-id") id: string) {
        return this.tenantService.deleteTenant(id);
    }
}
