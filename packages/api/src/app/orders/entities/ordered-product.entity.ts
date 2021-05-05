import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Product } from '../../products/entities/product.entity';

@Schema()
export class OrderedProduct {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Product.name,
    required: true
  })
  product: Types.ObjectId;

  @Prop({ type: Number, min: 1, required: true })
  quantity: number;
}

export type OrderedProductDocument = OrderedProduct & Document;

export const OrderedProductSchema = SchemaFactory.createForClass(
  OrderedProduct
);
