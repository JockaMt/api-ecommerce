import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateTenantThemeDTO {
    @ApiPropertyOptional({ description: "The ID of the tenant" })
    @IsOptional()
    @IsString()
    tenantId?: string;

    @ApiPropertyOptional({ description: "Primary brand color", example: "#22c55e" })
    @IsOptional()
    @IsString()
    primary?: string;

    @ApiPropertyOptional({ description: "Primary color used on hover states", example: "#16a34a" })
    @IsOptional()
    @IsString()
    primaryHover?: string;

    @ApiPropertyOptional({ description: "Secondary brand color", example: "#0f172a" })
    @IsOptional()
    @IsString()
    secondary?: string;

    @ApiPropertyOptional({ description: "Darker secondary variant", example: "#020617" })
    @IsOptional()
    @IsString()
    secondaryDark?: string;

    @ApiPropertyOptional({ description: "Base surface/background color", example: "#ffffff" })
    @IsOptional()
    @IsString()
    surface?: string;

    @ApiPropertyOptional({ description: "Primary text color", example: "#111827" })
    @IsOptional()
    @IsString()
    text?: string;

    @ApiPropertyOptional({ description: "Muted text color", example: "#6b7280" })
    @IsOptional()
    @IsString()
    textMuted?: string;

    @ApiPropertyOptional({ description: "Default border color", example: "#e5e7eb" })
    @IsOptional()
    @IsString()
    border?: string;

    @ApiPropertyOptional({ description: "Gradient start color", example: "#22c55e" })
    @IsOptional()
    @IsString()
    gradientStart?: string;

    @ApiPropertyOptional({ description: "Gradient middle color", example: "#16a34a" })
    @IsOptional()
    @IsString()
    gradientMid?: string;

    @ApiPropertyOptional({ description: "Gradient end color", example: "#14532d" })
    @IsOptional()
    @IsString()
    gradientEnd?: string;
}
