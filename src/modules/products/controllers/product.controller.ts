import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "@/modules/products/services/product.service";
import { CreateProductDto } from "../dto/create-product.dto";


@Controller(":tenantId/products")
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get(":name")
    getProduct(
        @Param("name") name: string,
        @Param("tenantId") tenantId: string
    ) {
        return this.productService.getProduct(name, tenantId);
    }

    @Get()
    listProducts(
        @Param("tenantId") tenantId: string
    ) {
        return this.productService.listProducts(tenantId);
    }

    @Get(":category")
    listProductsByCategory(
        @Param("category") category: string,
        @Param("tenantId") tenantId: string
    ) {
        return this.productService.listProductsByCategory(category, tenantId);
    }

    @Post()
    createProduct(@Body() dto: CreateProductDto) {
        return this.productService.createProduct(dto);
    }
}