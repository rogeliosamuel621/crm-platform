import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceResponse } from 'src/interfaces/ServiceResponse';
import { CreateCustomerDto } from './dto/customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto,
    userId: string,
  ): Promise<ServiceResponse> {
    try {
      // create a instance of a customer
      const customer = new this.customerModel({
        ...createCustomerDto,
        owner: userId,
      });

      // save in database
      await customer.save();

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        data: customer,
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
      // get customers of the current user
      const customers = await this.customerModel.find({
        owner: userId,
      });

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: customers || [],
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
      // get a customer by id
      const customer = await this.customerModel.findOne({ _id: id });

      // check if the customer exists
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      // check if the user is the owner
      if (customer.owner.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to perform this operation',
        );
      }

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: customer,
      };
    } catch (error) {
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }

  async remove(id: string, userId: string): Promise<ServiceResponse> {
    try {
      // get a customer by id
      const customer = await this.customerModel.findOne({ _id: id });

      // check if the customer exists
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      // check if the user is the owner
      if (customer.owner.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to perform this operation',
        );
      }

      await this.customerModel.findOneAndRemove({ _id: customer.id });

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: 'Customer deleted successfully',
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
