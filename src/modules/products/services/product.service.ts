import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "@/modules/products/dto/create-product.dto";
import { ProductRepository } from "@/modules/products/repositories/product.repository";
import {
    CreateProductUseCase,
} from "@/modules/products/use-cases";

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly createProductUseCase: CreateProductUseCase
    ) { }

    getProduct(name: string, tenantId: string) {
        return this.productRepository.findByName(name, tenantId);
    }

    listProducts(tenantId: string) {
        return this.productRepository.listProducts(tenantId);
    }

    listProductsByCategory(category: string, tenantId: string) {
        return this.productRepository.listProductsByCategory(category, tenantId);
    }

    createProduct(dto: CreateProductDto, tenantId: string) {
        return this.createProductUseCase.execute(dto, tenantId);
    }
}