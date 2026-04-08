import { Body, Controller, Get, Post } from "@nestjs/common";
import { AdminService } from "../services/admin.service";
import { CreateTenantDto } from "../dto/create-tenant.dto";

@Controller('admin/tenants')
export class AdminTenantsController {
    constructor(private readonly adminService: AdminService) { }

    @Get()
    listTenants() {
        return this.adminService.listTenants();
    }

    @Post()
    createTenant(@Body() dto: CreateTenantDto) {
        return this.adminService.createTenant(dto);
    }
}