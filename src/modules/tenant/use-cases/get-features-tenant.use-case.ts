import { Injectable, Inject } from "@nestjs/common";
import type { IFeatureRepository } from "@/modules/tenant/repositories/interfaces";
import { Feature } from "@/modules/tenant/domain";

/**
 * GetFeaturesTenantUseCase
 * 
 * Mudança SOLID:
 * - Antes: dependia de TenantRepository
 * - Agora: depende de IFeatureRepository (segregado)
 */
@Injectable()
export class GetFeaturesTenantUseCase {
    constructor(
        @Inject('IFeatureRepository')
        private readonly featureRepository: IFeatureRepository
    ) { }

    async execute(tenantId: string): Promise<Feature[]> {
        return this.featureRepository.findAllByTenantId(tenantId);
    }
}