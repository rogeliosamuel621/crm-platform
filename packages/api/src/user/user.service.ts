import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { ServiceResponse } from 'src/interfaces/ServiceResponse';
import { CreateUserDto, UserCredentialsDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ id: string; name: string }> {
    const { email, password } = createUserDto;

    // check if a user with the email is already registered
    const isEmailAlreadyInUse: User = await this.userModel.findOne({ email });
    if (isEmailAlreadyInUse) {
      throw new BadRequestException(
        'An account is already registered with this email',
      );
    }

    // hash the password
    const passwordHashed = await this.hashPassword(password);

    // create a new user object
    const user = new this.userModel({
      ...createUserDto,
      password: passwordHashed,
    });

    // save in database
    user.save((err) => {
      if (err) throw new InternalServerErrorException(err.message);
    });

    return {
      id: user.id,
      name: user.name,
    };
  }

  async validate(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ id: string; name: string }> {
    const { email, password } = userCredentialsDto;

    // verify that the user exists
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('The credentials entered are incorrect');
    }

    // verify password matches
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
      throw new BadRequestException('The credentials entered are incorrect');
    }

    return {
      id: user.id,
      name: user.name,
    };
  }

  async findOneById(id: string): Promise<ServiceResponse> {
    try {
      // get the user
      const user: User = await this.userModel.findOne({ _id: id });

      // verify if the user exists
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: { name: user.name, email: user.email },
      };
    } catch (error) {
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }

  private async hashPassword(plainPass: string): Promise<string> {
    return await argon2.hash(plainPass);
  }
}
