import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TenantService } from "@/modules/tenant/services/tenant.service";
import { CreateTenantDto } from "@/modules/tenant/dto/create-tenant.dto";
import { UpdateTenantDto } from "@/modules/tenant/dto/update-tenant.dto";
import { ApiDefaultGetter, ApiResponse } from "@nestjs/swagger";

@Controller('admin/tenants')
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'List of tenants' })
    listTenants() {
        return this.tenantService.listTenants();
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Tenant created successfully' })
    createTenant(@Body() dto: CreateTenantDto) {
        return this.tenantService.createTenant(dto);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Tenant updated successfully' })
    updateTenant(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
        return this.tenantService.updateTenant(id, dto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Tenant deleted successfully' })
    deleteTenant(@Param('id') id: string) {
        return this.tenantService.deleteTenant(id);
    }
}
