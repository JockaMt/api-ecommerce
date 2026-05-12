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
    title?: string;

    @ApiPropertyOptional({ description: "Highlighted text in the hero title", example: "50% OFF" })
    @IsOptional()
    @IsString()
    highlightWord?: string;

    @ApiPropertyOptional({ description: "Main hero description text", example: "Aproveite ofertas por tempo limitado em produtos selecionados." })
    @IsOptional()
    @IsString()
    description?: string;
}