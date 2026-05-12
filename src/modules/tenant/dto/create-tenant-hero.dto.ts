import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTenantHeroDTO {
    @ApiProperty({ description: "The ID of the tenant" })
    @IsString()
    tenantId!: string;

    @ApiProperty({ description: "Short badge text displayed above the hero title", example: "Frete Grátis" })
    @IsString()
    badge!: string;

    @ApiProperty({ description: "First line of the hero title", example: "Coleção de Inverno" })
    @IsString()
    title!: string;

    @ApiProperty({ description: "Highlighted text in the hero title", example: "50% OFF" })
    @IsString()
    highlightWord!: string;

    @ApiProperty({ description: "Main hero description text", example: "Aproveite ofertas por tempo limitado em produtos selecionados." })
    @IsString()
    description!: string;
}