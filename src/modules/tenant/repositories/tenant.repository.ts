import { PrismaService } from '@/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTenantDto, UpdateTenantDto } from '@/modules/tenant/dto';
import { Tenant } from '@/modules/tenant/domain';
import { ITenantRepository } from './interfaces';

/**
 * Repositório refatorado para CRUD de Tenant
 * Responsabilidade única: Gerenciar entidade Tenant
 * 
 * Segregação SOLID:
 * - Theme: use ThemeRepository
 * - Hero: use HeroRepository
 * - Features: use FeatureRepository
 * - Normalização: use TenantKeyNormalizer
 */
@Injectable()
export class TenantRepository implements ITenantRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tenantKeyNormalizer: TenantKeyNormalizer
    ) { }

    async findById(id: string): Promise<Tenant | null> {
        const raw = await this.prisma.tenant.findUnique({ where: { id } });
        return raw ? this.mapToPrismaModel(raw) : null;
    }

    async findByName(name: string): Promise<Tenant | null> {
        const raw = await this.prisma.tenant.findUnique({ where: { name } });
        return raw ? this.mapToPrismaModel(raw) : null;
    }

    async findByHostKey(hostKey: string): Promise<Tenant | null> {
        const normalizedHostKey = this.tenantKeyNormalizer.normalize(hostKey);
        if (!normalizedHostKey) {
            return null;
        }

        const exact = await this.findByName(hostKey);
        if (exact) {
            return exact;
        }

        const tenants = await this.findAll();
        const found = tenants.find(
            (tenant) =>
                this.tenantKeyNormalizer.normalize(tenant.name) === normalizedHostKey
        );
        return found ?? null;
    }

    async findAll(): Promise<Tenant[]> {
        const raw = await this.prisma.tenant.findMany();
        return raw.map((t) => this.mapToPrismaModel(t));
    }

    async create(dto: CreateTenantDto): Promise<Tenant> {
        const raw = await this.prisma.tenant.create({ data: dto as any });
        return this.mapToPrismaModel(raw);
    }

    async update(id: string, dto: UpdateTenantDto): Promise<Tenant> {
        const raw = await this.prisma.tenant.update({ where: { id }, data: dto });
        return this.mapToPrismaModel(raw);
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await this.prisma.tenant.delete({ where: { id } });
        return !!deleted;
    }

    private mapToPrismaModel(raw: any): Tenant {
        return new Tenant(raw.id, raw.name, raw.themeName, {
            metaTitle: raw.metaTitle,
            metaDescription: raw.metaDescription,
            phone: raw.phone,
            phoneDisplay: raw.phoneDisplay,
            instagram: raw.instagram,
            whatsappMessage: raw.whatsappMessage,
            footerDescription: raw.footerDescription,
            footerNotice: raw.footerNotice,
            status: raw.status,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
}

/**
 * Serviço utilitário para normalizar keys de tenant
 * Responsabilidade única: Normalizar strings para busca
 * 
 * Uso: TenantRepository, TenantHostMiddleware
 */
@Injectable()
export class TenantKeyNormalizer {
    normalize(value: string): string {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}
