import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "@/modules/products/dto/create-product.dto";
import { PrismaService } from "@/modules/prisma/service/prisma.service";

@Injectable()
export class ProductRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async findByName(name: string, tenantId: string): Promise<any> {
        return this.prismaService.product.findFirst({
            where: {
                name: name,
                tenantId: tenantId
            }
        });
    }

    async create(dto: CreateProductDto, tenantId: string): Promise<any> {
        return this.prismaService.product.create({
            data: {
                ...dto,
                tenantId,
            }
        });

    }

    async listProducts(tenantId: string): Promise<any> {
        return this.prismaService.product.findMany({
            where: {
                tenantId: tenantId
            }
        });
    }

    async listProductsByCategory(category: string, tenantId: string): Promise<any> {
        return this.prismaService.product.findMany({
            where: {
                tenantId: tenantId,
                category: category
            }
        });
    }
}