import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTenantDto {
    @ApiProperty({ description: 'Nome do tenant', example: 'Template Store' })
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Nome do tema', example: 'PRO' })
    @IsString()
    themeName?: string;
    
    @ApiProperty({ description: 'Meta título para SEO', example: 'Template Store | E-commerce Base' })
    @IsString()
    metaTitle?: string;

    @ApiProperty({ description: 'Meta descrição para SEO', example: 'Seu e-commerce premium pronto para vendas.' })
    @IsString()
    metaDescription?: string;
    
    @ApiProperty({ description: 'Número de telefone para contato', example: '5582991245437' })
    @IsString()
    phone?: string;

    @ApiProperty({ description: 'Telefone para exibição', example: '(82) 99124-5437' })
    @IsString()
    phoneDisplay?: string;
    
    @ApiProperty({ description: 'Instagram do tenant', example: '@suamarcAqui' })
    @IsString()
    instagram?: string;

    @ApiProperty({ description: 'Mensagem padrão para WhatsApp', example: 'Olá, gostaria de saber mais os produtos!' })
    @IsString()
    whatsappMessage?: string;

    @ApiProperty({ description: 'Descrição do rodapé', example: 'Sua loja de demonstração definitiva para atrair clientes. Design profissional, ágil e customizável.' })
    @IsString()
    footerDescription?: string;

    @ApiProperty({ description: 'Aviso do rodapé', example: 'Feito com paixão. Envio para todo o Brasil.' })
    @IsString()
    footerNotice?: string;
}
