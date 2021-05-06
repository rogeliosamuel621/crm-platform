import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { Order, OrderDocument } from './entities/order.entity';

import { ProductsService } from '../products/products.service';
import { CustomersService } from '../customers/customers.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
    private readonly customersService: CustomersService,
    private readonly productsService: ProductsService
  ) {}

  async create(userId: string, payload: CreateOrderDto): Promise<Order> {
    const { products, customer } = payload;

    // verify if the ordered products exists
    for (const item of products) {
      const isFound = await this.productsService.findOne(userId, item.product);
      if (!isFound) {
        throw new NotFoundException("The entered product doesn't exists");
      }
    }

    // find the assigned customer
    const isCustomerFound = await this.customersService.findOne(
      userId,
      customer
    );
    if (!isCustomerFound) {
      throw new NotFoundException("The entered customer doesn't exists");
    }

    // decrease the stock of each product
    let total = 0;
    for (const item of products) {
      // make sure that the products have enough stock
      const product = await this.productsService.findOne(userId, item.product);
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `The product: ${product.name} doesn't have enough stock available`
        );
      }
      total += product.price * item.quantity;
      // update the product
      await this.productsService.update(userId, item.product, {
        stock: product.stock - item.quantity
      });
    }

    // create an the order object
    const order = new this.model({
      ...payload,
      seller: userId,
      total: total,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    return await order.save();
  }

  async findAll(payload: string): Promise<Order[]> {
    // find all orders of the user
    const orders: Order[] = await this.model.find({ seller: payload });

    return orders || [];
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
