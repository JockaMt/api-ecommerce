import { PrismaService } from "@/modules/prisma/service/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateTenantHeroDTO, CreateTenantThemeDTO, UpdateTenantHeroDTO, UpdateTenantThemeDTO } from "@/modules/tenant/dto";

@Injectable()
export class TenantRepository {
    constructor(private readonly prisma: PrismaService) { }

    private normalizeTenantKey(value: string): string {
        return value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    async getTheme(tenantId: string): Promise<any> {
        return this.prisma.theme.findFirst({ where: { tenantId } });
    }

    async setTheme(tenantId: string, theme: CreateTenantThemeDTO | UpdateTenantThemeDTO): Promise<any> {
        return this.prisma.theme.update({ where: { tenantId }, data: theme });
    }

    async createTheme(dto: any): Promise<any> {
        return this.prisma.theme.create({ data: dto });
    }

    async findById(id: string): Promise<any> {
        return this.prisma.tenant.findUnique({ where: { id } });
    }

    async findByName(name: string): Promise<any> {
        return this.prisma.tenant.findUnique({ where: { name } });
    }

    async findByHostKey(hostKey: string): Promise<any> {
        const normalizedHostKey = this.normalizeTenantKey(hostKey);
        if (!normalizedHostKey) {
            return null;
        }

        const exact = await this.findByName(hostKey);
        if (exact) {
            return exact;
        }

        const tenants = await this.findAll();
        return tenants.find((tenant) => this.normalizeTenantKey(tenant.name) === normalizedHostKey) ?? null;
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

    async getHero(tenantId: string): Promise<any> {
        return this.prisma.hero.findUnique({ where: { tenantId } });
    }

    async setHero(tenantId: string, hero: CreateTenantHeroDTO | UpdateTenantHeroDTO): Promise<any> {
        return this.prisma.hero.update({ where: { tenantId }, data: hero });
    }


    async getFeatures(tenantId: string): Promise<any> {
        return this.prisma.feature.findMany({ where: { tenantId } });
    }
}
