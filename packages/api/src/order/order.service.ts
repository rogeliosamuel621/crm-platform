import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Customer,
  CustomerDocument,
} from 'src/customer/schemas/customer.schema';
import { ServiceResponse } from 'src/interfaces/ServiceResponse';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    userId: string,
  ): Promise<ServiceResponse> {
    try {
      // check if the customer exists
      const isCustomerFound = await this.customerModel.findOne({
        _id: createOrderDto.customer,
      });
      if (!isCustomerFound) {
        throw new BadRequestException('The customer entered does not exist');
      }

      for (const item of [...createOrderDto.products]) {
        // check if the products exists
        const isProductFound = await this.productModel.findOne({
          _id: item.id,
        });
        if (!isProductFound) {
          throw new BadRequestException('The product entered does not exist');
        }

        // decrease the value of the stock
        if (isProductFound.stock < item.quantity) {
          throw new BadRequestException(
            'The product does not have enough stock',
          );
        }

        await this.productModel.findOneAndUpdate(
          { _id: item.id },
          { stock: (isProductFound.stock -= item.quantity) },
        );
      }

      // create an instance of a order
      const order = new this.orderModel({ ...createOrderDto, owner: userId });

      // save in database
      await order.save();

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        data: order,
      };
    } catch (error) {
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }

  async findAll(userId: string): Promise<ServiceResponse> {
    try {
      const orders = await this.orderModel.find({ owner: userId });

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        data: orders || [],
      };
    } catch (error) {
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }

  async findOne(id: string, userId: string): Promise<ServiceResponse> {
    try {
      const order = await this.orderModel.findOne({ _id: id });

      // check if the order exists
      if (!order) {
        throw new NotFoundException('Order not found');
      }

      // check if the user is the owner of the order
      if (order.owner.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to perfom this operation',
        );
      }

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: order,
      };
    } catch (error) {
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }

  async update(
    id: string,
    userId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<ServiceResponse> {
    try {
      const order = await this.orderModel.findOne({ _id: id });

      // check if the order exists
      if (!order) {
        throw new NotFoundException('Order not found');
      }

      // check if the user is the owner of the order
      if (order.owner.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to perfom this operation',
        );
      }

      // increase the value of the products
      if (updateOrderDto.status === 'CANCELLED') {
        for (const item of [...order.products]) {
          // check if the products exists
          const isProductFound = await this.productModel.findOne({
            _id: item.id,
          });
          if (isProductFound) {
            await this.productModel.findOneAndUpdate(
              { _id: item.id },
              { stock: (isProductFound.stock += item.quantity) },
            );
          }
        }
      }

      // increase/decrease the stock of new or old values
      if (updateOrderDto.products) {
        for (const updated of [...updateOrderDto.products]) {
          const isProductFound = await this.productModel.findOne({
            _id: updated.id,
          });
          for (const old of [...order.products]) {
            if (updated.id.toString() === old.id.toString()) {
              let quantity = 0;

              if (updated.quantity > old.quantity) {
                quantity += updated.quantity - old.quantity;
                // check if the products exists

                if (isProductFound) {
                  await this.productModel.findOneAndUpdate(
                    { _id: updated.id },
                    { stock: (isProductFound.stock += quantity) },
                  );
                }
              }

              if (updated.quantity < old.quantity) {
                quantity += old.quantity - updated.quantity;
                if (isProductFound) {
                  await this.productModel.findOneAndUpdate(
                    { _id: updated.id },
                    { stock: (isProductFound.stock -= quantity) },
                  );
                }
              }
            } else {
              if (isProductFound) {
                await this.productModel.findOneAndUpdate(
                  { _id: updated.id },
                  { stock: (isProductFound.stock += updated.quantity) },
                );
              }
            }
          }
        }
      }
      const products = [];

      updateOrderDto.products.forEach((item) => products.push(item));
      const updatedOrder = await this.orderModel.findOneAndUpdate(
        { _id: order.id },
        { ...updateOrderDto, products: [...products] },
        { new: true },
      );

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: updatedOrder,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }

  async remove(id: string, userId: string): Promise<ServiceResponse> {
    try {
      const order = await this.orderModel.findOne({ _id: id });

      // check if the order exists
      if (!order) {
        throw new NotFoundException('Order not found');
      }

      // check if the user is the owner of the order
      if (order.owner.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to perfom this operation',
        );
      }

      // increase the value of the products
      if (order.status === 'PENDING' || order.status === 'IN PROGRESS') {
        for (const item of [...order.products]) {
          // check if the products exists
          const isProductFound = await this.productModel.findOne({
            _id: item.id,
          });
          if (isProductFound) {
            await this.productModel.findOneAndUpdate(
              { _id: item.id },
              { stock: (isProductFound.stock += item.quantity) },
            );
          }
        }
      }

      // remove the order
      await this.orderModel.findOneAndRemove({ _id: order.id });

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: 'Order deleted successfully',
      };
    } catch (error) {
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }
}
