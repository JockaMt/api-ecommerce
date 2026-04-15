import { ConflictException, Injectable, Logger, Inject } from '@nestjs/common';
import type { ITenantRepository, IThemeRepository } from '@/modules/tenant/repositories/interfaces';
import { CreateTenantDto, CreateTenantThemeDTO } from '@/modules/tenant/dto';
import { Tenant } from '@/modules/tenant/domain';

/**
 * CreateTenantUseCase
 * 
 * Mudança SOLID:
 * - Antes: dependia de TenantRepository
 * - Agora: depende de ITenantRepository e IThemeRepository (segregado)
 * 
 * Responsabilidade: Orquestrar criação de tenant com seu tema padrão
 */
@Injectable()
export class CreateTenantUseCase {
    constructor(
        @Inject('ITenantRepository')
        private readonly tenantRepository: ITenantRepository,
        @Inject('IThemeRepository')
        private readonly themeRepository: IThemeRepository
    ) { }

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

    async execute(dto: CreateTenantDto): Promise<Tenant> {
        const exists = await this.tenantRepository.findByName(dto.name);

        if (exists) {
            Logger.error("Uma empresa com esse nome já foi cadastrada.", "CreateTenantUseCase");
            throw new ConflictException("Uma empresa com esse nome já foi cadastrada.");
        }

        const tenant = await this.tenantRepository.create(dto);

        // Criar tema padrão para o tenant
        const defaultTheme = this.buildDefaultTheme();
        await this.themeRepository.create({
            ...defaultTheme,
            tenantId: tenant.id,
        } as CreateTenantThemeDTO & { tenantId: string });

        return tenant;
    }
}
