/**
 * Entidade de Domínio: StoreSettings
 * Representa os dados públicos da loja vinculados ao tenant
 */
export class StoreSettings {
    metaTitle?: string;
    metaDescription?: string;
    phone?: string;
    phoneDisplay?: string;
    instagram?: string;
    whatsappMessage?: string;
    footerDescription?: string;
    footerNotice?: string;

    constructor(data?: {
        metaTitle?: string;
        metaDescription?: string;
        phone?: string;
        phoneDisplay?: string;
        instagram?: string;
        whatsappMessage?: string;
        footerDescription?: string;
        footerNotice?: string;
    }) {
        this.metaTitle = data?.metaTitle;
        this.metaDescription = data?.metaDescription;
        this.phone = data?.phone;
        this.phoneDisplay = data?.phoneDisplay;
        this.instagram = data?.instagram;
        this.whatsappMessage = data?.whatsappMessage;
        this.footerDescription = data?.footerDescription;
        this.footerNotice = data?.footerNotice;
    }
}
