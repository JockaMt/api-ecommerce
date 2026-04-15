import { Controller, Get } from "@nestjs/common";
import { CurrentTenant } from "@/common/tenant/current-tenant.decorator";
import { CategoryService } from "@/modules/products/services/category.service";
import type { TenantContext } from "@/modules/tenant/tenant-context.type";
import { ApiBadRequestResponse, ApiHeader, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    @Get()
    @ApiOperation({ summary: "Lista as categorias de produtos do tenant" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
    })
    @ApiOkResponse({ description: "Lista de categorias retornada com sucesso" })
    @ApiBadRequestResponse({ description: "Host do tenant ausente ou invalido" })
    listCategories(@CurrentTenant() tenant: TenantContext) {
        return this.categoryService.listCategories(tenant.id);
    }
}