import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateProductDto {
    @ApiProperty({ description: 'ID do tenant', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsNotEmpty()
    tenantId!: string;

    @ApiProperty({ description: 'Nome do produto', example: 'Camiseta Estampada' })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ description: 'Categoria do produto', example: 'Roupas' })
    @IsString()
    @IsNotEmpty()
    category!: string;

    @ApiProperty({ description: 'Descrição do produto', example: 'Camiseta 100% algodão com estampa exclusiva.' })
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({ description: 'Preço do produto', example: 79.99 })
    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @ApiProperty({ description: 'Preço original do produto (opcional)', example: 99.99 })
    @IsNumber()
    priceOriginal?: number;

    @ApiProperty({ description: 'Badge do produto (opcional)', example: 'Novo' })
    @IsString()
    badge?: string;

    @ApiProperty({ description: 'URL da imagem do produto', example: 'https://example.com/images/camiseta.jpg' })
    @IsString()
    @IsNotEmpty()
    image!: string;

    @ApiProperty({ description: 'Avaliação do produto (opcional)', example: 4.5 })
    @IsNumber()
    rating?: number;

    @ApiProperty({ description: 'Número de avaliações do produto (opcional)', example: 150 })
    @IsNumber()
    reviews?: number;

    @ApiProperty({ description: 'Quantidade em estoque do produto', example: 50 })
    @IsNumber()
    @IsNotEmpty()
    stock!: number;

    @ApiProperty({ description: 'Indica se o produto é destaque (opcional)', example: true })
    @IsBoolean()
    highlight?: boolean;
}