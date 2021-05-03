import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

import { User } from '../../users/entities/user.entity';

@Schema()
export class Product {
  @Prop({ type: String, trim: true, required: true })
  name: string;

  @Prop({ type: String, trim: true, default: 'N/A' })
  description: string;

  @Prop({ type: Number, required: true, min: 1 })
  price: number;

  @Prop({ type: Number, required: true, min: 0 })
  stock: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  owner: Types.ObjectId;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
