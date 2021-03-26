import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface OrderDocument extends Document {
  name: string;
  total: number;
  status: 'PENDING' | 'IN PROGRESS' | 'COMPLETED' | 'CANCELLED';
  products: [
    {
      product: string;
      quantity: number;
    },
  ];
  customer: string;
  owner: string;
  createdAt: Date;
}

export const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'IN PROGRESS', 'COMPLETED', 'CANCELLED'],
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
