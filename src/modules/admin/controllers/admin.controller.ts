import { Controller, Get } from "@nestjs/common";

@Controller("admin")
export class AdminController {
    @Get()
    getAdminInfo(): object {
        return {
            module: 'admin',
            routes: ['GET /admin', 'GET /admin/tenants', 'POST /admin/tenants'],
        };
    }
}