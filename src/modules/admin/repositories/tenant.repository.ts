export class TenantRepository {
    private readonly tenants: any[] = [];

    async findByName(name: string): Promise<any> {
        return this.tenants.find((tenant) => tenant.name_1 === name) ?? null;
    }

    async create(dto: any): Promise<any> {
        const created = { id: `tenant-${this.tenants.length + 1}`, ...dto };
        this.tenants.push(created);
        return created;
    }

    async findAll(): Promise<any[]> {
        return this.tenants;
    }
}