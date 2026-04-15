import { Module } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/service/prisma.service";
import { ProductController } from "@/modules/products/controllers/product.controller";
import { ProductService } from "@/modules/products/services/product.service";
import { ProductRepository } from "@/modules/products/repositories/product.repository";
import { CategoryController } from "@/modules/products/controllers/category.controller";
import { CreateProductUseCase } from "@/modules/products/use-cases";
import { CategoryService } from "./services/category.service";
import { CategoryRepository } from "./repositories/category.repository";

@Module({
    imports: [],
    controllers: [ProductController, CategoryController],
    providers: [
        PrismaService,
        ProductService,
        CategoryService,
        ProductRepository,
        CategoryRepository,
        CreateProductUseCase,
        // Registrar interface para injeção de dependência
        {
            provide: 'IProductRepository',
            useClass: ProductRepository,
        },
    ],
    exports: [ProductService, ProductRepository],
})
export class ProductModule { }
