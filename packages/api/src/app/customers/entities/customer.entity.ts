import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Schema()
export class Customer {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, trim: true, required: true })
  name: string;

  @Prop({ type: String, trim: true, unique: true, required: true })
  email: string;

  @Prop({ type: String, trim: true, default: 'N/A' })
  position?: string;

  @Prop({ type: String, trim: true, default: 'N/A' })
  company?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  owner: Types.ObjectId;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export type CustomerDocument = Customer & Document;

export const CustomerSchema = SchemaFactory.createForClass(Customer);
