import { Response } from 'express';
import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(201)
  async register(
    @Body() payload: RegisterUserDto,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.authService.register(payload);

    return res.json({ response: 'success', data });
  }
}
