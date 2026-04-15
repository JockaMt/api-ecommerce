import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { TenantRepository } from '@/modules/tenant/repositories/tenant.repository';
import { CreateTenantDto, CreateTenantThemeDTO } from '@/modules/tenant/dto';

@Injectable()
export class CreateTenantUseCase {
    constructor(private readonly tenantRepository: TenantRepository) { }

    private buildDefaultTheme(): Omit<CreateTenantThemeDTO, 'tenantId'> {
        return {
            primary: '#00b5d8',
            primaryHover: '#009aba',
            secondary: '#133b96',
            secondaryDark: '#0a1a54',
            surface: '#f8f4ef',
            text: '#2f2924',
            textMuted: '#6b625b',
            border: '#e8ddd2',
            gradientStart: '#2f7fe9',
            gradientMid: '#3da7f2',
            gradientEnd: '#79d0ff',
        };
    }

    async execute(dto: CreateTenantDto) {

        const exists = await this.tenantRepository.findByName(dto.name);

        if (exists) {
            Logger.error("Uma empresa com esse nome já foi cadastrada.", "CreateTenantUseCase");
            throw new ConflictException("Uma empresa com esse nome já foi cadastrada.");
        }

        const tenant = await this.tenantRepository.create(dto, this.buildDefaultTheme());

        return tenant;
    }
}
