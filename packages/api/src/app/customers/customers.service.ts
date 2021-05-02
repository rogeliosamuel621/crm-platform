import { Model, Types } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { Customer, CustomerDocument } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly model: Model<CustomerDocument>
  ) {}

  async create(userId: string, payload: CreateCustomerDto): Promise<Customer> {
    // verify if the customer email is available
    const isEmailAlreadyInUse = await this.model.findOne({
      email: payload.email,
      owner: userId
    });
    if (isEmailAlreadyInUse) {
      throw new BadRequestException(
        'This email is already used by another customer'
      );
    }

    // create a new customer object
    const customer = new this.model({
      ...payload,
      owner: userId
    });

    // save and return the created customer
    return await customer.save();
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
