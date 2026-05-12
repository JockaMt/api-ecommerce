import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateStoreSettingsDto {
    @ApiPropertyOptional({ description: 'Meta título para SEO', example: 'Template Store | E-commerce Base' })
    @IsOptional()
    @IsString()
    metaTitle?: string;

    @ApiPropertyOptional({ description: 'Meta descrição para SEO', example: 'Seu e-commerce premium pronto para vendas.' })
    @IsOptional()
    @IsString()
    metaDescription?: string;

    @ApiPropertyOptional({ description: 'Número de telefone para contato', example: '5582991245437' })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({ description: 'Telefone para exibição', example: '(82) 99124-5437' })
    @IsOptional()
    @IsString()
    phoneDisplay?: string;

    @ApiPropertyOptional({ description: 'Instagram da loja', example: '@suamarcAqui' })
    @IsOptional()
    @IsString()
    instagram?: string;

    @ApiPropertyOptional({ description: 'Mensagem padrão para WhatsApp', example: 'Olá, gostaria de saber mais os produtos!' })
    @IsOptional()
    @IsString()
    whatsappMessage?: string;

    @ApiPropertyOptional({ description: 'Descrição do rodapé', example: 'Sua loja de demonstração definitiva para atrair clientes. Design profissional, ágil e customizável.' })
    @IsOptional()
    @IsString()
    footerDescription?: string;

    @ApiPropertyOptional({ description: 'Aviso do rodapé', example: 'Feito com paixão. Envio para todo o Brasil.' })
    @IsOptional()
    @IsString()
    footerNotice?: string;
}
