import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { UpdateStoreSettingsDto } from "./update-store-settings.dto";

export class UpdateTenantDto {
    @ApiProperty({ description: 'Nome do tenant', example: 'Template Store' })
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Nome do tema', example: 'PRO' })
    @IsString()
    themeName?: string;

    @ApiPropertyOptional({ type: UpdateStoreSettingsDto, description: 'Dados públicos da loja' })
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateStoreSettingsDto)
    storeSettings?: UpdateStoreSettingsDto;
}
