/**
 * Entidade de Domínio: Tenant
 * Representa uma loja multi-tenant
 */
export class Tenant {
    id: string;
    name: string;
    themeName: string;
    metaTitle?: string;
    metaDescription?: string;
    phone?: string;
    phoneDisplay?: string;
    instagram?: string;
    whatsappMessage?: string;
    footerDescription?: string;
    footerNotice?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        name: string,
        themeName: string,
        data?: {
            metaTitle?: string;
            metaDescription?: string;
            phone?: string;
            phoneDisplay?: string;
            instagram?: string;
            whatsappMessage?: string;
            footerDescription?: string;
            footerNotice?: string;
            status?: string;
            createdAt?: Date;
            updatedAt?: Date;
        }
    ) {
        this.id = id;
        this.name = name;
        this.themeName = themeName;
        this.metaTitle = data?.metaTitle;
        this.metaDescription = data?.metaDescription;
        this.phone = data?.phone;
        this.phoneDisplay = data?.phoneDisplay;
        this.instagram = data?.instagram;
        this.whatsappMessage = data?.whatsappMessage;
        this.footerDescription = data?.footerDescription;
        this.footerNotice = data?.footerNotice;
        this.status = data?.status || 'active';
        this.createdAt = data?.createdAt || new Date();
        this.updatedAt = data?.updatedAt || new Date();
    }
}
