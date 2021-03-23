import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: 'N/A' })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: mongoose.Types.ObjectId;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
