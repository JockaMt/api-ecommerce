/**
 * Entidade de Domínio: Product
 * Produto no catálogo de um tenant
 */
export class Product {
    id: string;
    tenantId: string;
    name: string;
    category: string;
    description?: string;
    price: number;
    priceOriginal?: number;
    badge?: string;
    image?: string;
    rating?: number;
    reviews?: number;
    stock: number;
    highlight: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        tenantId: string,
        name: string,
        category: string,
        price: number,
        stock: number,
        data?: {
            description?: string;
            priceOriginal?: number;
            badge?: string;
            image?: string;
            rating?: number;
            reviews?: number;
            highlight?: boolean;
            createdAt?: Date;
            updatedAt?: Date;
        }
    ) {
        this.id = id;
        this.tenantId = tenantId;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.description = data?.description;
        this.priceOriginal = data?.priceOriginal;
        this.badge = data?.badge;
        this.image = data?.image;
        this.rating = data?.rating;
        this.reviews = data?.reviews;
        this.highlight = data?.highlight || false;
        this.createdAt = data?.createdAt || new Date();
        this.updatedAt = data?.updatedAt || new Date();
    }
}
