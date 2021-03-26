import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type OrderedProductDocument = OrderedProduct & Document;

@Schema({ _id: false })
export class OrderedProduct {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  id: mongoose.Types.ObjectId;

  @Prop({ type: Number, min: 0, required: true })
  quantity: number;
}

export const OrderedProductSchema = SchemaFactory.createForClass(
  OrderedProduct,
);
