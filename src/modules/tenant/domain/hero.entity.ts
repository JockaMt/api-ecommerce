/**
 * Entidade de Domínio: Hero
 * Seção hero/banner principal de um tenant
 */
export class Hero {
    tenantId: string;
    badge?: string;
    titleLine1?: string;
    titleLine2?: string;
    titleHighlight?: string;
    description?: string;
    buttonPrimary?: string;
    buttonSecondary?: string;

    constructor(
        tenantId: string,
        data?: {
            badge?: string;
            titleLine1?: string;
            titleLine2?: string;
            titleHighlight?: string;
            description?: string;
            buttonPrimary?: string;
            buttonSecondary?: string;
        }
    ) {
        this.tenantId = tenantId;
        this.badge = data?.badge;
        this.titleLine1 = data?.titleLine1;
        this.titleLine2 = data?.titleLine2;
        this.titleHighlight = data?.titleHighlight;
        this.description = data?.description;
        this.buttonPrimary = data?.buttonPrimary;
        this.buttonSecondary = data?.buttonSecondary;
    }
}
