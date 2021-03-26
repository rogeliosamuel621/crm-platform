import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, min: 0, required: true })
  total: number;

  @Prop({
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'IN PROGRESS', 'COMPLETED'],
  })
  status: string;

  // TODO - I NEED TO FIX THIS
  products: [{ quantity: number; product: mongoose.Types.ObjectId }];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  })
  customer: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: mongoose.Types.ObjectId;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
