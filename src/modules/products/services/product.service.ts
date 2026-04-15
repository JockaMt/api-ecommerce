import { Injectable, Inject } from "@nestjs/common";
import { CreateProductDto } from "@/modules/products/dto/create-product.dto";
import { Product } from "@/modules/products/domain";
import type { IProductRepository } from "@/modules/products/repositories/interfaces";
import {
    CreateProductUseCase,
} from "@/modules/products/use-cases";

/**
 * ProductService
 * 
 * Mudança SOLID:
 * - Antes: dependia de ProductRepository (implementação)
 * - Agora: depende de IProductRepository (interface)
 * 
 * Benefício: Fácil trocar de banco de dados sem modificar este arquivo
 */
@Injectable()
export class ProductService {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        private readonly createProductUseCase: CreateProductUseCase
    ) { }

    async getProduct(name: string, tenantId: string): Promise<Product | null> {
        return this.productRepository.findByName(name, tenantId);
    }

    async listProducts(tenantId: string): Promise<Product[]> {
        return this.productRepository.listByTenantId(tenantId);
    }

    async listProductsByCategory(category: string, tenantId: string): Promise<Product[]> {
        return this.productRepository.listByCategory(category, tenantId);
    }

    async createProduct(dto: CreateProductDto, tenantId: string): Promise<Product> {
        return this.createProductUseCase.execute(dto, tenantId);
    }
}