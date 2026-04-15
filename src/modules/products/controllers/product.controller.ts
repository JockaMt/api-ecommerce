import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ProductService } from "@/modules/products/services/product.service";
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
        name: "x-tenant-id",
        required: true,
        description: "Identificador do tenant para isolar os produtos",
    })
    @ApiParam({
        name: "name",
        description: "Nome do produto",
        example: "Camiseta Estampada",
    })
    @ApiOkResponse({ description: "Produto retornado com sucesso" })
    @ApiBadRequestResponse({ description: "Header x-tenant-id ausente ou inválido" })
    getProduct(
        @Param("name") name: string,
        @Headers("x-tenant-id") tenantId: string
    ) {
        return this.productService.getProduct(name, tenantId);
    }

    @Get()
    @ApiOperation({ summary: "Lista os produtos do tenant" })
    @ApiHeader({
        name: "x-tenant-id",
        required: true,
        description: "Identificador do tenant para listar os produtos",
    })
    @ApiOkResponse({ description: "Lista de produtos retornada com sucesso" })
    @ApiBadRequestResponse({ description: "Header x-tenant-id ausente ou inválido" })
    listProducts(
        @Headers("x-tenant-id") tenantId: string
    ) {
        return this.productService.listProducts(tenantId);
    }

    @Get("category/:category")
    @ApiOperation({ summary: "Lista produtos por categoria" })
    @ApiHeader({
        name: "x-tenant-id",
        required: true,
        description: "Identificador do tenant para filtrar produtos por categoria",
    })
    @ApiParam({
        name: "category",
        description: "Categoria dos produtos",
        example: "Roupas",
    })
    @ApiOkResponse({ description: "Produtos da categoria retornados com sucesso" })
    @ApiBadRequestResponse({ description: "Header x-tenant-id ausente ou inválido" })
    listProductsByCategory(
        @Param("category") category: string,
        @Headers("x-tenant-id") tenantId: string
    ) {
        return this.productService.listProductsByCategory(category, tenantId);
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