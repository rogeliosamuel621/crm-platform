import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

import { OrderStatusEnum } from '../enums/order-status.enum';

import { Customer } from '../../customers/entities/customer.entity';
import { User } from '../../users/entities/user.entity';
import { OrderedProduct } from './ordered-product.entity';

@Schema()
export class Order {
  @Prop({ type: String, trim: true, required: true })
  title: string;

  @Prop({ type: String, trim: true, required: false })
  description?: string;

  @Prop({
    type: String,
    default: OrderStatusEnum.OPEN,
    enum: Object.values(OrderStatusEnum)
  })
  status: OrderStatusEnum;

  @Prop({ type: () => [OrderedProduct], required: true })
  products: OrderedProduct[];

  @Prop({ type: Number, min: 0, required: true })
  total: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Customer.name,
    required: true
  })
  customer: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true
  })
  seller: Types.ObjectId;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
