import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "@/modules/products/services/product.service";
import { CreateProductDto } from "../dto/create-product.dto";


@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get(":tenantId/:name")
    getProduct(
        @Param("name") name: string,
        @Param("tenantId") tenantId: string
    ) {
        return this.productService.getProduct(name, tenantId);
    }

    @Get(":tenantId")
    listProducts(
        @Param("tenantId") tenantId: string
    ) {
        return this.productService.listProducts(tenantId);
    }

    @Get(":tenantId/:category")
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