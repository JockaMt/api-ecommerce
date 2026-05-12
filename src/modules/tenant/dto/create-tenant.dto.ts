import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateStoreSettingsDto } from "./create-store-settings.dto";

export class CreateTenantDto {
    @ApiProperty({ description: 'Nome do tenant', example: 'Template Store' })
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty({ description: 'Nome do tema', example: 'PRO' })
    @IsNotEmpty()
    @IsString()
    themeName!: string;

    @ApiPropertyOptional({ type: CreateStoreSettingsDto, description: 'Dados públicos da loja' })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateStoreSettingsDto)
    storeSettings?: CreateStoreSettingsDto;
}