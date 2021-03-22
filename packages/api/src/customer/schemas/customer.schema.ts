import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

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
  owner: User;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
