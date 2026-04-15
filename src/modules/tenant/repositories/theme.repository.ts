import { PrismaService } from '@/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTenantThemeDTO, UpdateTenantThemeDTO } from '@/modules/tenant/dto';
import { Theme } from '@/modules/tenant/domain';
import { IThemeRepository } from './interfaces';

/**
 * Repositório segregado para CRUD de Theme
 * Responsabilidade única: Gerenciar entidade Theme
 * 
 * Antes: TenantRepository.getTheme, TenantRepository.setTheme
 * Agora: ThemeRepository (interface: IThemeRepository)
 */
@Injectable()
export class ThemeRepository implements IThemeRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByTenantId(tenantId: string): Promise<Theme | null> {
        const raw = await this.prisma.theme.findFirst({ where: { tenantId } });
        return raw ? this.mapToPrismaModel(raw) : null;
    }

    async create(dto: CreateTenantThemeDTO & { tenantId: string }): Promise<Theme> {
        const raw = await this.prisma.theme.create({ data: dto as any });
        return this.mapToPrismaModel(raw);
    }

    async update(
        tenantId: string,
        dto: UpdateTenantThemeDTO
    ): Promise<Theme> {
        const raw = await this.prisma.theme.update({
            where: { tenantId },
            data: dto,
        });
        return this.mapToPrismaModel(raw);
    }

    private mapToPrismaModel(raw: any): Theme {
        return new Theme(
            raw.id,
            raw.tenantId,
            raw.primary,
            raw.primaryHover,
            raw.secondary,
            raw.secondaryDark,
            raw.surface,
            raw.text,
            raw.textMuted,
            raw.border,
            raw.gradientStart,
            raw.gradientMid,
            raw.gradientEnd
        );
    }
}
