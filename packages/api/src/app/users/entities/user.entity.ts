import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema()
export class User {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, trim: true, required: true })
  name: string;

  @Prop({ type: String, default: nanoid(10) })
  username: string;

  @Prop({ type: String, unique: true, trim: true, required: true })
  email: string;

  @Prop({ type: String, trim: true, required: true, select: false })
  password: string;

  @Prop({ type: Boolean, default: true })
  enabled: boolean;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
