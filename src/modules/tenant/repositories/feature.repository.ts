import { PrismaService } from '@/modules/prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { Feature } from '@/modules/tenant/domain';
import { IFeatureRepository } from './interfaces';

/**
 * Repositório segregado para leitura de Features
 * Responsabilidade única: Gerenciar entidade Feature
 * 
 * Antes: TenantRepository.getFeatures
 * Agora: FeatureRepository (interface: IFeatureRepository)
 */
@Injectable()
export class FeatureRepository implements IFeatureRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAllByTenantId(tenantId: string): Promise<Feature[]> {
        const raw = await this.prisma.feature.findMany({ where: { tenantId } });
        return raw.map((f) => this.mapToPrismaModel(f));
    }

    private mapToPrismaModel(raw: any): Feature {
        return new Feature(raw.id, raw.tenantId, {
            icon: raw.icon,
            label: raw.label,
            title: raw.title,
            colors: raw.colors,
        });
    }
}
