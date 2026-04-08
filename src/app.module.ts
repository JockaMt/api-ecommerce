import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from '@/modules/admin/admin.module';
import { TenantModule } from '@/modules/tenant/tenant.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    TenantModule,
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
