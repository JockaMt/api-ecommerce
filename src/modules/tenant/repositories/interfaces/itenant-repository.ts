import { Tenant } from '@/modules/tenant/domain';
import { CreateTenantDto, UpdateTenantDto } from '@/modules/tenant/dto';

/**
 * Interface que define contrato para operações CRUD de Tenant
 * Implementação: TenantRepository
 */
export interface ITenantRepository {
    findById(id: string): Promise<Tenant | null>;
    findByName(name: string): Promise<Tenant | null>;
    findByHostKey(hostKey: string): Promise<Tenant | null>;
    findAll(): Promise<Tenant[]>;
    create(dto: CreateTenantDto): Promise<Tenant>;
    update(id: string, dto: UpdateTenantDto): Promise<Tenant>;
    delete(id: string): Promise<boolean>;
}
