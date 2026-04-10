import { PrismaService } from "@/modules/prisma/service/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TenantRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getTheme(tenantId: string): Promise<any> {
        return this.prisma.theme.findFirst({ where: { tenantId } });
    }

    async createTheme(dto: any): Promise<any> {
        return this.prisma.theme.create({ data: dto });
    }

    async updateTheme(id: string, dto: any): Promise<any> {
        return this.prisma.theme.update({ where: { id }, data: dto });
    }

    async findById(id: string): Promise<any> {
        return this.prisma.tenant.findUnique({ where: { id } });
    }

    async findByName(name: string): Promise<any> {
        return this.prisma.tenant.findUnique({ where: { name } });
    }

    async create(dto: any): Promise<any> {
        return this.prisma.tenant.create({ data: dto });
    }

    async findAll(): Promise<any[]> {
        return this.prisma.tenant.findMany();
    }

    async update(id: string, dto: any): Promise<any> {
        return this.prisma.tenant.update({ where: { id }, data: dto });
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await this.prisma.tenant.delete({ where: { id } });
        return !!deleted;
    }
}
