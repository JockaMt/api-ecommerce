import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "@/modules/products/repositories/category.repository";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async listCategories(tenantId: string): Promise<string[]> {
        return this.categoryRepository.listProductCategories(tenantId);
    }
}