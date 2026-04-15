import { Product } from '@/modules/products/domain';
import { CreateProductDto } from '@/modules/products/dto/create-product.dto';

/**
 * Interface que define contrato para operações CRUD de Product
 * Implementação: ProductRepository
 */
export interface IProductRepository {
    findByName(name: string, tenantId: string): Promise<Product | null>;
    listByTenantId(tenantId: string): Promise<Product[]>;
    listByCategory(category: string, tenantId: string): Promise<Product[]>;
    create(dto: CreateProductDto, tenantId: string): Promise<Product>;
}
