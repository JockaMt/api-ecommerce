import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/service/prisma.service";

@Injectable()
export class CategoryRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async listProductCategories(tenantId: string): Promise<string[]> {
        const categories = await this.prismaService.product.findMany({
            where: {
                tenantId: tenantId
            },
            select: {
                category: true
            },
            distinct: ['category']
        });
        return categories.map((p) => p.category);
    }
}