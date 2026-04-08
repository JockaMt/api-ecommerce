export class TenantRepository {
    private readonly tenants: any[] = [];

    async findById(id: string): Promise<any> {
        return this.tenants.find((tenant) => tenant.id === id) ?? null;
    }

    async findByName(name: string): Promise<any> {
        return this.tenants.find((tenant) => tenant.name === name) ?? null;
    }

    async create(dto: any): Promise<any> {
        const created = { id: `${(dto.name).toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`, ...dto };
        this.tenants.push(created);
        return created;
    }

    async findAll(): Promise<any[]> {
        return this.tenants;
    }

    async update(id: string, dto: any): Promise<any> {
        const index = this.tenants.findIndex((tenant) => tenant.id === id);
        if (index === -1) return null;
        this.tenants[index] = { ...this.tenants[index], ...dto };
        return this.tenants[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.tenants.findIndex((tenant) => tenant.id === id);
        if (index === -1) return false;
        this.tenants.splice(index, 1);
        return true;
    }
}