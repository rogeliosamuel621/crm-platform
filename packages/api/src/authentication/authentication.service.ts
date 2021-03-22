import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServiceResponse } from 'src/interfaces/ServiceResponse';
import { UserService } from 'src/user/user.service';
import { AuthCredentialsDto, AuthRegisterDto } from './dto/authentication.dto';
import { JwtPayload } from './interfaces/jwtPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ServiceResponse> {
    try {
      // validate the user
      const user = await this.userService.validate(authCredentialsDto);

      // generate a token
      const payload: JwtPayload = { ...user };
      const token = await this.jwtService.sign(payload);

      return { status: 'success', statusCode: HttpStatus.OK, data: token };
    } catch (error) {
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }

  async register(authRegisterDto: AuthRegisterDto): Promise<ServiceResponse> {
    try {
      // create a user
      const user = await this.userService.create(authRegisterDto);

      // generate a token
      const payload: JwtPayload = { ...user };
      const token = await this.jwtService.sign(payload);

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        data: token,
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
