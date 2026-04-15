import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateTenantHeroDTO {
    @ApiPropertyOptional({ description: "Short badge text displayed above the hero title", example: "Frete Grátis" })
    @IsOptional()
    @IsString()
    badge?: string;

    @ApiPropertyOptional({ description: "First line of the hero title", example: "Coleção de Inverno" })
    @IsOptional()
    @IsString()
    titleLine1?: string;

    @ApiPropertyOptional({ description: "Second line of the hero title", example: "com até" })
    @IsOptional()
    @IsString()
    titleLine2?: string;

    @ApiPropertyOptional({ description: "Highlighted text in the hero title", example: "50% OFF" })
    @IsOptional()
    @IsString()
    titleHighlight?: string;

    @ApiPropertyOptional({ description: "Main hero description text", example: "Aproveite ofertas por tempo limitado em produtos selecionados." })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: "Primary CTA button label", example: "Comprar Agora" })
    @IsOptional()
    @IsString()
    buttonPrimary?: string;

    @ApiPropertyOptional({ description: "Secondary CTA button label", example: "Ver Ofertas" })
    @IsOptional()
    @IsString()
    buttonSecondary?: string;
}