import { Injectable, Inject } from "@nestjs/common";
import type { ITenantRepository } from "@/modules/tenant/repositories/interfaces";
import { Tenant } from "@/modules/tenant/domain";

@Injectable()
export class ListTenantUseCase {
    constructor(
        @Inject('ITenantRepository')
        private readonly tenantRepository: ITenantRepository
    ) { }

    async execute(): Promise<Tenant[]> {
        return this.tenantRepository.findAll();
    }
}