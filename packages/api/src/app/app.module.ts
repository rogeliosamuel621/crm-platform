import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configObject from '../config/config-object';
import configSchema from '../config/config-schema';

import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configObject],
      validationSchema: configSchema,
    }),
    UsersModule,
    CustomersModule,
    OrdersModule,
    ProductsModule,
  ],
})
export class AppModule {}
