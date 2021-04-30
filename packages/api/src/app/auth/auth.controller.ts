import { Response } from 'express';
import { Body, Controller, HttpCode, Post, Get, Res } from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterUserDto } from './dto/register-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @HttpCode(200)
  async authenticate(
    @Body() payload: AuthCredentialsDto,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.authService.authenticate(payload);

    return res.json({ response: 'success', data });
  }

  @Post('/signup')
  @HttpCode(201)
  async register(
    @Body() payload: RegisterUserDto,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.authService.register(payload);

    return res.json({ response: 'success', data });
  }

  @Get('/me')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: JwtPayload, @Res() res: Response) {
    const data = await this.authService.findCurrent(user.id);

    return res.json({ response: 'success', data });
  }
}
