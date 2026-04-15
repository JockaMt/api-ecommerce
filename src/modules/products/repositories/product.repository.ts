import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "@/modules/products/dto/create-product.dto";
import { PrismaService } from "@/modules/prisma/service/prisma.service";
import { Product } from "@/modules/products/domain";
import { IProductRepository } from "./interfaces";

/**
 * Repositório para CRUD de Product
 * Implementa interface IProductRepository para permitir testes e diferentes implementações
 */
@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async findByName(name: string, tenantId: string): Promise<Product | null> {
        const raw = await this.prismaService.product.findFirst({
            where: {
                name: name,
                tenantId: tenantId
            }
        });
        return raw ? this.mapToPrismaModel(raw) : null;
    }

    async create(dto: CreateProductDto, tenantId: string): Promise<Product> {
        const raw = await this.prismaService.product.create({
            data: {
                ...dto,
                tenantId,
            }
        });
        return this.mapToPrismaModel(raw);
    }

    async listByTenantId(tenantId: string): Promise<Product[]> {
        const raw = await this.prismaService.product.findMany({
            where: {
                tenantId: tenantId
            }
        });
        return raw.map(p => this.mapToPrismaModel(p));
    }

    async listByCategory(category: string, tenantId: string): Promise<Product[]> {
        const raw = await this.prismaService.product.findMany({
            where: {
                tenantId: tenantId,
                category: category
            }
        });
        return raw.map(p => this.mapToPrismaModel(p));
    }

    private mapToPrismaModel(raw: any): Product {
        return new Product(
            raw.id,
            raw.tenantId,
            raw.name,
            raw.category,
            raw.price,
            raw.stock,
            {
                description: raw.description,
                priceOriginal: raw.priceOriginal,
                badge: raw.badge,
                image: raw.image,
                rating: raw.rating,
                reviews: raw.reviews,
                highlight: raw.highlight,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            }
        );
    }
}