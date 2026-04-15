import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CurrentTenant } from "@/common/tenant/current-tenant.decorator";
import { ProductService } from "@/modules/products/services/product.service";
import type { TenantContext } from "@/modules/tenant/tenant-context.type";
import { CreateProductDto } from "../dto/create-product.dto";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiHeader,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";

@ApiTags("Products")
@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get(":name")
    @ApiOperation({ summary: "Busca um produto por nome" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
    })
    @ApiParam({
        name: "name",
        description: "Nome do produto",
        example: "Camiseta Estampada",
    })
    @ApiOkResponse({ description: "Produto retornado com sucesso" })
    @ApiBadRequestResponse({ description: "Host do tenant ausente ou invalido" })
    getProduct(
        @Param("name") name: string,
        @CurrentTenant() tenant: TenantContext
    ) {
        return this.productService.getProduct(name, tenant.id);
    }

    @Get()
    @ApiOperation({ summary: "Lista os produtos do tenant" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
    })
    @ApiOkResponse({ description: "Lista de produtos retornada com sucesso" })
    @ApiBadRequestResponse({ description: "Host do tenant ausente ou invalido" })
    listProducts(
        @CurrentTenant() tenant: TenantContext
    ) {
        return this.productService.listProducts(tenant.id);
    }

    @Get("category/:category")
    @ApiOperation({ summary: "Lista produtos por categoria" })
    @ApiHeader({
        name: "x-forwarded-host",
        required: false,
        description: "Host do tenant para testes no Swagger UI (ex.: loja1.localhost:3000)",
    })
    @ApiParam({
        name: "category",
        description: "Categoria dos produtos",
        example: "Roupas",
    })
    @ApiOkResponse({ description: "Produtos da categoria retornados com sucesso" })
    @ApiBadRequestResponse({ description: "Host do tenant ausente ou invalido" })
    listProductsByCategory(
        @Param("category") category: string,
        @CurrentTenant() tenant: TenantContext
    ) {
        return this.productService.listProductsByCategory(category, tenant.id);
    }

    @Post()
    @ApiOperation({ summary: "Cria um novo produto" })
    @ApiBody({ type: CreateProductDto, description: "Dados do produto a ser criado" })
    @ApiCreatedResponse({ description: "Produto criado com sucesso" })
    @ApiBadRequestResponse({ description: "Payload inválido para criação do produto" })
    createProduct(@Body() dto: CreateProductDto) {
        return this.productService.createProduct(dto);
    }
}