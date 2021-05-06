import { Model, Schema } from 'mongoose';
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
import { OrderStatusEnum } from './enums/order-status.enum';
import { Product } from '../products/entities/product.entity';

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

    return (await order.save()).populate('customer').execPopulate();
  }

  async findAll(payload: string): Promise<Order[]> {
    // find all orders of the user
    const orders: Order[] = await this.model
      .find({ seller: payload })
      .populate('customer');

    return orders || [];
  }

  async findOne(userId: string, id: string): Promise<Order> {
    // find the requested order
    const order: Order = await this.model
      .findOne({ _id: id, seller: userId })
      .populate('customer');

    // throw an error if the order doesn't exists
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(
    userId: string,
    id: string,
    payload: UpdateOrderDto
  ): Promise<Order> {
    // make sure that the order exists
    const oldOrder: Order = await this.findOne(userId, id);

    // increase the stock of the products if the order is cancelled
    if (payload.status === OrderStatusEnum.CANCELLED) {
      for (const item of oldOrder.products) {
        const product = await this.productsService.findOne(userId, id);
        await this.productsService.update(userId, `${item.product}`, {
          stock: (product.stock += item.quantity)
        });
      }
    }

    // increase/decrease the stock of the products
    if (payload.products) {
      for (const update of payload.products) {
        // find the product
        const product: Product = await this.productsService.findOne(
          userId,
          update.product
        );

        for (const old of oldOrder.products) {
          // check if the update product and the new product are the same
          if (update.product.toString() === '' + old.product) {
            let quantity = 0;

            // if the new quantity is bigger that the old, decrease the stock
            if (update.quantity > old.quantity) {
              quantity += update.quantity - old.quantity;
              // make sure that the product has enough stock
              if (product.stock < quantity) {
                throw new BadRequestException(
                  `The product: ${product.name} doesn't have enough stock available`
                );
              } else {
                await this.productsService.update(
                  userId,
                  update.product.toString(),
                  { stock: product.stock - quantity }
                );
              }
            }
            // increase the stock if the new quantity is less that the old
            if (update.quantity < old.quantity) {
              quantity += old.quantity - update.quantity;
              // make sure that the product has enough stock
              if (product.stock <= 0 || product.stock < quantity) {
                throw new BadRequestException(
                  `The product: ${product.name} doesn't have enough stock available`
                );
              } else {
                await this.productsService.update(
                  userId,
                  update.product.toString(),
                  { stock: product.stock + quantity }
                );
              }
            }
          } else {
            // make sure that the product has enough stock
            if (product.stock <= 0 || product.stock < update.quantity) {
              throw new BadRequestException(
                `The product: ${product.name} doesn't have enough stock available`
              );
            }
            // if the product is new, decrease their stock
            await this.productsService.update(
              userId,
              update.product.toString(),
              { stock: (product.stock -= update.quantity) }
            );
          }
        }
      }
    }

    // get the new total
    let total = 0;
    for (const item of payload.products) {
      const product = await this.productsService.findOne(userId, item.product);
      total += product.price * item.quantity;
    }

    // this fix a little typo error - temporal solution
    const products = [];
    payload.products.forEach(item => products.push(item));

    // update and return the order
    return this.model
      .findOneAndUpdate(
        { _id: id },
        {
          ...payload,
          products,
          total: Number(total.toFixed(2)),
          updatedAt: new Date(Date.now())
        },
        { new: true }
      )
      .populate('customers');
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
