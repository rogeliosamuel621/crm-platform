import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'app/users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

import { RegisterUserDto } from './dto/register-user.dto';

import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async authenticate(payload: AuthCredentialsDto): Promise<string> {
    try {
      // check if the user's credentials are valid
      const { _id, username, email } = await this.usersService.validate(
        payload
      );

      // generate the token
      const jwtPayload: JwtPayload = { id: `${_id}`, username, email };
      const accessToken: string = await this.jwtService.signAsync(jwtPayload);

      return accessToken;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async register(payload: RegisterUserDto): Promise<string> {
    try {
      // create an user and get the information
      const { _id, username, email } = await this.usersService.create(payload);

      // generate the token
      const jwtPayload: JwtPayload = { id: `${_id}`, username, email };
      const accessToken: string = await this.jwtService.signAsync(jwtPayload);

      return accessToken;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
