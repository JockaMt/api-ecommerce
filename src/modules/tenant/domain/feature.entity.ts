/**
 * Entidade de Domínio: Feature
 * Recurso/Diferencial de um tenant
 */
export class Feature {
    id: number;
    tenantId: string;
    icon?: string;
    label?: string;
    title?: string;
    colors?: Record<string, unknown>;

    constructor(
        id: number,
        tenantId: string,
        data?: {
            icon?: string;
            label?: string;
            title?: string;
            colors?: Record<string, unknown>;
        }
    ) {
        this.id = id;
        this.tenantId = tenantId;
        this.icon = data?.icon;
        this.label = data?.label;
        this.title = data?.title;
        this.colors = data?.colors;
    }
}
