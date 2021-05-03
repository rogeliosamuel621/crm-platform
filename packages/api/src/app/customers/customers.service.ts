import { Model, Types } from 'mongoose';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
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

  async findAll(payload: string): Promise<Customer[]> {
    // find all customers of the user
    const customers: Customer[] = await this.model.find({ owner: payload });

    return customers || [];
  }

  async findOne(userId: string, id: string): Promise<Customer> {
    // find the requested customer
    const customer: Customer = await this.model.findOne({ _id: id });

    // throw an error if the customer doesn't exists
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // verify that the user is the owner of the customer
    const isUserTheOwner = `${customer.owner}` === userId;
    if (!isUserTheOwner) {
      throw new ForbiddenException('You cannot access this information');
    }

    return customer;
  }

  async update(
    userId: string,
    id: string,
    payload: UpdateCustomerDto
  ): Promise<Customer> {
    // make sure that the customer exists
    await this.findOne(userId, id);

    // update the customer
    return this.model.findOneAndUpdate(
      {
        _id: id
      },
      { ...payload },
      { new: true }
    );
  }

  async remove(userId: string, id: string): Promise<string> {
    // make sure that the customer exists
    await this.findOne(userId, id);

    // delete the customer
    await this.model.findOneAndRemove({ _id: id });

    return 'Customer deleted successfully';
  }
}
