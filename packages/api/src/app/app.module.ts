import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configObject from '../config/config-object';
import configSchema from '../config/config-schema';

import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configObject],
      validationSchema: configSchema
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    CustomersModule,
    OrdersModule,
    ProductsModule,
    AuthModule
  ]
})
export class AppModule {}
