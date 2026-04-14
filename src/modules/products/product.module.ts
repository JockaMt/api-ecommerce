import { Module } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/service/prisma.service";
import { ProductController } from "@/modules/products/controllers/product.controller";
import { ProductService } from "@/modules/products/services/product.service";
import { ProductRepository } from "@/modules/products/repositories/product.repository";
import { CreateProductUseCase } from "@/modules/products/use-cases";

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [
        PrismaService,
        ProductService,
        ProductRepository,
        CreateProductUseCase
    ],
    exports: [ProductService, ProductRepository],
})
export class ProductModule { }
