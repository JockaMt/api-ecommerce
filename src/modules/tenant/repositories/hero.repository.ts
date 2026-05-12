import { PrismaService } from '@/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTenantHeroDTO, UpdateTenantHeroDTO } from '@/modules/tenant/dto';
import { Hero } from '@/modules/tenant/domain';
import { IHeroRepository } from './interfaces';

/**
 * Repositório segregado para CRUD de Hero
 * Responsabilidade única: Gerenciar entidade Hero
 * 
 * Antes: TenantRepository.getHero, TenantRepository.setHero
 * Agora: HeroRepository (interface: IHeroRepository)
 */
@Injectable()
export class HeroRepository implements IHeroRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByTenantId(tenantId: string): Promise<Hero | null> {
        const raw = await this.prisma.hero.findUnique({ where: { tenantId } });
        return raw ? this.mapToPrismaModel(raw) : null;
    }

    async create(dto: CreateTenantHeroDTO & { tenantId: string }): Promise<Hero> {
        const raw = await this.prisma.hero.create({ data: dto as any });
        return this.mapToPrismaModel(raw);
    }

    async update(
        tenantId: string,
        dto: UpdateTenantHeroDTO
    ): Promise<Hero> {
        const raw = await this.prisma.hero.update({
            where: { tenantId },
            data: dto,
        });
        return this.mapToPrismaModel(raw);
    }

    private mapToPrismaModel(raw: any): Hero {
        return new Hero(raw.tenantId, {
            badge: raw.badge,
            title: raw.title,
            highlightWord: raw.highlightWord,
            description: raw.description,
        });
    }
}
