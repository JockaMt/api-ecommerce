import { PrismaService } from "@/modules/prisma/service/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "@/modules/products/dto/create-product.dto";
import { ProductRepository } from "@/modules/products/repositories/product.repository";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) { }

    getProduct(name: string, tenantId: string) {
        return this.productRepository.findByName(name, tenantId);
    }

    listProducts(tenantId: string) {
        return this.productRepository.listProducts(tenantId);
    }

    listProductsByCategory(category: string, tenantId: string) {
        return this.productRepository.listProductsByCategory(category, tenantId);
    }

    createProduct(dto: CreateProductDto) {
        return this.productRepository.create(dto);
    }
}