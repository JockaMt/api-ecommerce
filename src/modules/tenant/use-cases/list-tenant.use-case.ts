import { Injectable } from "@nestjs/common";
import { TenantRepository } from "../repositories/tenant.repository";

@Injectable()
export class ListTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    async execute() {
        return this.tenantRepository.findAll();
    }
}