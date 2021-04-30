import { Model } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';

import { User, UserDocument } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    const { email, password } = payload;

    try {
      // check if there is already a user with that email
      const isEmailAlreadyInUse: User = await this.model.findOne({ email });
      if (isEmailAlreadyInUse) {
        throw new BadRequestException(
          'An account is already registered with this email'
        );
      }

      // create a hash for the user's password
      const hashedPassword = await argon2.hash(password);

      // create a new user object
      const user = new this.model({
        ...payload,
        password: hashedPassword
      });

      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validate(payload: ValidateUserDto): Promise<User> {
    const { email, password } = payload;

    try {
      // verify user exists
      const user: User = await this.model.findOne({ email }).select('password');
      if (!user) {
        throw new BadRequestException('The entered credentials are incorrect');
      }

      // verify that the password is correct
      const isPasswordCorrect = await argon2.verify(user.password, password);
      if (!isPasswordCorrect) {
        throw new BadRequestException('The entered credentials are incorrect');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(payload: string): Promise<User> {
    try {
      // find the user by their _id
      const user: User = await this.model.findOne({ _id: payload });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
