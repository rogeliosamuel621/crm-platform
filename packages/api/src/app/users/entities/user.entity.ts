import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  // TODO: field for the user's picture

  @Prop({ type: String, trim: true, required: true })
  name: string;

  @Prop({ type: String, trim: true, required: true })
  username: string;

  @Prop({ type: String, unique: true, trim: true, required: true })
  email: string;

  @Prop({ type: String, trim: true, required: true })
  password: string;

  @Prop({ type: Boolean, default: true })
  enabled: boolean;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
