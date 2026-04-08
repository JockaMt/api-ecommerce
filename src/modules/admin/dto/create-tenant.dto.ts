import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTenantDto {
    @ApiProperty({ description: 'Nome do tenant', example: 'Template Store' })
    @IsNotEmpty()
    @IsString()
    name!: string;
    themeName!: string;
    metaTitle?: string;
    metaDescription?: string;
    phone?: string;
    phoneDisplay?: string;
    instagram?: string;
    whatsappMessage?: string;
    footerDescription?: string;
    footerNotice?: string;
}

// "name_1": "Template",
// "name_2": "Store",
// "themeName": "PRO",
// "metaTitle": "Template Store | E-commerce Base",
// "metaDescription": "Seu e-commerce premium pronto para vendas.",
// "phone": "5582991245437",
// "phoneDisplay": "(82) 99124-5437",
// "instagram": "@suamarcAqui",
// "whatsappMessage": "Olá, gostaria de saber mais os produtos!",
// "footerDescription": "Sua loja de demonstração definitiva para atrair clientes. Design profissional, ágil e customizável.",
// "footerNotice": "Feito com paixão. Envio para todo o Brasil."