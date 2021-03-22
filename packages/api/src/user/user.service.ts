import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ id: string; name: string }> {
    const { email } = createUserDto;

    // check if a user with the email is already registered
    const isEmailAlreadyInUse = await this.userModel.findOne({ email });
    if (isEmailAlreadyInUse) {
      throw new BadRequestException(
        'An account is already registered with this email',
      );
    }

    // create a new user object
    const user = new this.userModel({ ...createUserDto });

    // save in database
    user.save((err) => {
      if (err) throw new InternalServerErrorException(err.message);
    });

    return {
      id: user.id,
      name: user.name,
    };
  }
}
