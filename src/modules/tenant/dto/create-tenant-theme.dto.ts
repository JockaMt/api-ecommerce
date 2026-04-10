import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTenantThemeDTO {
    @ApiProperty({ description: "The ID of the tenant" })
    @IsString()
    tenantId!: string;

    @ApiProperty({ description: "Primary brand color", example: "#22c55e" })
    @IsString()
    primary!: string;

    @ApiProperty({ description: "Primary color used on hover states", example: "#16a34a" })
    @IsString()
    primaryHover!: string;

    @ApiProperty({ description: "Secondary brand color", example: "#0f172a" })
    @IsString()
    secondary!: string;

    @ApiProperty({ description: "Darker secondary variant", example: "#020617" })
    @IsString()
    secondaryDark!: string;

    @ApiProperty({ description: "Base surface/background color", example: "#ffffff" })
    @IsString()
    surface!: string;

    @ApiProperty({ description: "Primary text color", example: "#111827" })
    @IsString()
    text!: string;

    @ApiProperty({ description: "Muted text color", example: "#6b7280" })
    @IsString()
    textMuted!: string;

    @ApiProperty({ description: "Default border color", example: "#e5e7eb" })
    @IsString()
    border!: string;

    @ApiProperty({ description: "Gradient start color", example: "#22c55e" })
    @IsString()
    gradientStart!: string;

    @ApiProperty({ description: "Gradient middle color", example: "#16a34a" })
    @IsString()
    gradientMid!: string;

    @ApiProperty({ description: "Gradient end color", example: "#14532d" })
    @IsString()
    gradientEnd!: string;
}
