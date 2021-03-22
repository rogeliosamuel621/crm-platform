import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { AuthCredentialsDto, AuthRegisterDto } from './dto/authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('/signin')
  async authenticate(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { status, statusCode, data, error } = await this.authService.validate(
      authCredentialsDto,
    );

    return res.status(statusCode).json({
      response: status,
      data,
      error,
    });
  }

  @Post('/signup')
  async register(
    @Body() authRegisterDto: AuthRegisterDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { status, statusCode, data, error } = await this.authService.register(
      authRegisterDto,
    );

    return res.status(statusCode).json({
      response: status,
      data,
      error,
    });
  }
}
