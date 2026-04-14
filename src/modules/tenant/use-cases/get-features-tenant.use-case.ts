import { Injectable } from "@nestjs/common";
import { TenantRepository } from "../repositories/tenant.repository";

@Injectable()
export class GetFeaturesTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute(tenantId: string) {
        return this.tenantRepository.getFeatures(tenantId);
    }
}