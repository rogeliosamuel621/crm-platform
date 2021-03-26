import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { Customer, CustomerSchema } from 'src/customer/schemas/customer.schema';
import { Product, ProductSchema } from 'src/product/schemas/product.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
