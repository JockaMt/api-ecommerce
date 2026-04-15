export type TenantContext = {
    id: string;
    name: string;
    status: string;
    plan?: string;
    features?: string[];
};