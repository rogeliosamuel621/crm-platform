import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GetUser } from 'src/authentication/decorators/getUser.decorator';
import { JwtPayload } from 'src/authentication/interfaces/jwtPayload.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard())
  async current(
    @GetUser() user: JwtPayload,
    @Res() res: Response,
  ): Promise<Response> {
    const {
      status,
      statusCode,
      data,
      error,
    } = await this.userService.findOneById(user.id);

    return res.status(statusCode).json({ response: status, data, error });
  }
}
