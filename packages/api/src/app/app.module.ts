import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, CustomersModule, OrdersModule, ProductsModule],
})
export class AppModule {}
