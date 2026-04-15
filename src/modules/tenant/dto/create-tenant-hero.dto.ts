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
    titleLine1!: string;

    @ApiProperty({ description: "Second line of the hero title", example: "com até" })
    @IsString()
    titleLine2!: string;

    @ApiProperty({ description: "Highlighted text in the hero title", example: "50% OFF" })
    @IsString()
    titleHighlight!: string;

    @ApiProperty({ description: "Main hero description text", example: "Aproveite ofertas por tempo limitado em produtos selecionados." })
    @IsString()
    description!: string;

    @ApiProperty({ description: "Primary CTA button label", example: "Comprar Agora" })
    @IsString()
    buttonPrimary!: string;

    @ApiProperty({ description: "Secondary CTA button label", example: "Ver Ofertas" })
    @IsString()
    buttonSecondary!: string;
}