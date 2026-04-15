import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from '@/modules/admin/admin.module';
import { TenantModule } from '@/modules/tenant/tenant.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { ProductModule } from './modules/products/product.module';
import { TenantHostMiddleware } from '@/common/tenant/tenant-host.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    TenantModule,
    ProductModule,
    PrismaModule
  ],
  controllers: [],
  providers: [TenantHostMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantHostMiddleware).forRoutes('*');
  }
}
