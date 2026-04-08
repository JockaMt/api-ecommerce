import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TenantService } from "../services/tenant.service";
import { CreateTenantDto } from "../dto/create-tenant.dto";
import { UpdateTenantDto } from "../dto/update-tenant.dto";

@Controller('admin/tenants')
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    listTenants() {
        return this.tenantService.listTenants();
    }

    @Post()
    createTenant(@Body() dto: CreateTenantDto) {
        return this.tenantService.createTenant(dto);
    }

    @Put(':id')
    updateTenant(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
        return this.tenantService.updateTenant(id, dto);
    }

    @Delete(':id')
    deleteTenant(@Param('id') id: string) {
        return this.tenantService.deleteTenant(id);
    }
}
