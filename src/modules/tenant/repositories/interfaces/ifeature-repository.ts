import { Feature } from '@/modules/tenant/domain';

/**
 * Interface que define contrato para operações de leitura de Features
 * Implementação: FeatureRepository
 */
export interface IFeatureRepository {
    findAllByTenantId(tenantId: string): Promise<Feature[]>;
}
