import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TenantService } from "@/modules/tenant/services/tenant.service";
import { CreateTenantThemeDTO, UpdateTenantThemeDTO } from "@/modules/tenant/dto";
import { ApiBody, ApiExtraModels, getSchemaPath } from "@nestjs/swagger";

@ApiExtraModels(CreateTenantThemeDTO, UpdateTenantThemeDTO)
@Controller(":tenantId/theme")
export class SetTenantThemeController {
    constructor(private readonly tenantService: TenantService) { }

    @Post()
    @ApiBody({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(CreateTenantThemeDTO) },
                { $ref: getSchemaPath(UpdateTenantThemeDTO) },
            ],
        },
    })
    setTheme(@Param("tenantId") tenantId: string, @Body() dto: CreateTenantThemeDTO | UpdateTenantThemeDTO) {
        return this.tenantService.setTheme(tenantId, dto);
    }

    @Get()
    getTheme(@Param("tenantId") tenantId: string) {
        return this.tenantService.getTheme(tenantId);
    }
}