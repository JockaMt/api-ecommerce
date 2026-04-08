import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AdminTenantService } from "../services/tenant-service";
import { CreateTenantDto } from "../dto/create-tenant.dto";
import { UpdateTenantDto } from "../dto/update-tenant.dto";

@Controller('admin/tenants')
export class AdminTenantsController {
    constructor(private readonly adminTenantService: AdminTenantService) { }

    @Get()
    listTenants() {
        return this.adminTenantService.listTenants();
    }

    @Post()
    createTenant(@Body() dto: CreateTenantDto) {
        return this.adminTenantService.createTenant(dto);
    }

    @Put(':id')
    updateTenant(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
        return this.adminTenantService.updateTenant(id, dto);
    }

    @Delete(':id')
    deleteTenant(@Param('id') id: string) {
        return this.adminTenantService.deleteTenant(id);
    }
}