import { Module } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/service/prisma.service";
import { ProductController } from "@/modules/products/controllers/product.controller";
import { ProductService } from "@/modules/products/services/product.service";
import { ProductRepository } from "@/modules/products/repositories/product.repository";

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [
        PrismaService,
        ProductService,
        ProductRepository
    ],
    exports: [ProductService, ProductRepository],
})
export class ProductModule { }
