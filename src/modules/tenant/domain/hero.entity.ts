/**
 * Entidade de Domínio: Hero
 * Seção hero/banner principal de um tenant
 */
export class Hero {
    tenantId: string;
    badge?: string;
    title?: string;
    highlightWord?: string;
    description?: string;

    constructor(
        tenantId: string,
        data?: {
            badge?: string;
            title?: string;
            highlightWord?: string;
            description?: string;
        }
    ) {
        this.tenantId = tenantId;
        this.badge = data?.badge;
        this.title = data?.title;
        this.highlightWord = data?.highlightWord;
        this.description = data?.description;
    }
}
