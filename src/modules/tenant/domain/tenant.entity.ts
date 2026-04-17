/**
 * Entidade de Domínio: Tenant
 * Representa uma loja multi-tenant
 */
export class Tenant {
    id: string;
    name: string;
    themeName: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    storeSettings?: {
        metaTitle?: string;
        metaDescription?: string;
        phone?: string;
        phoneDisplay?: string;
        instagram?: string;
        whatsappMessage?: string;
        footerDescription?: string;
        footerNotice?: string;
    };

    constructor(
        id: string,
        name: string,
        themeName: string,
        data?: {
            status?: string;
            createdAt?: Date;
            updatedAt?: Date;
            storeSettings?: {
                metaTitle?: string;
                metaDescription?: string;
                phone?: string;
                phoneDisplay?: string;
                instagram?: string;
                whatsappMessage?: string;
                footerDescription?: string;
                footerNotice?: string;
            };
        }
    ) {
        this.id = id;
        this.name = name;
        this.themeName = themeName;
        this.status = data?.status || 'active';
        this.createdAt = data?.createdAt || new Date();
        this.updatedAt = data?.updatedAt || new Date();
        this.storeSettings = data?.storeSettings;
    }
}
