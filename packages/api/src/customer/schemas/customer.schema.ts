import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: 'N/A' })
  position: string;

  @Prop({ type: String, default: 'N/A' })
  company: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: mongoose.Types.ObjectId;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
