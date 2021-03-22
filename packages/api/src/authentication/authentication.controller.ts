import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { AuthRegisterDto } from './dto/authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

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
