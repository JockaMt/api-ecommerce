import { Injectable } from "@nestjs/common";
import { ProductRepository } from "@/modules/products/repositories/product.repository";
import { CreateProductDto } from "@/modules/products/dto/create-product.dto";

@Injectable()
export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(dto: CreateProductDto) {

        const exists = await this.productRepository.findByName(dto.name, dto.tenantId);

        if (exists) {
            throw new Error("Product already exists");
        }

        return this.productRepository.create(dto);
    }
}