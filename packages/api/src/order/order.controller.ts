import { Response } from 'express';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';
import { GetUser } from 'src/authentication/decorators/getUser.decorator';
import { CreateOrderDto } from './dto/order.dto';

@Controller('order')
@UseGuards(AuthGuard())
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(
    @GetUser() user,
    @Body() createOrderDto: CreateOrderDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { status, statusCode, data, error } = await this.orderService.create(
      createOrderDto,
      user.id,
    );

    return res.status(statusCode).json({ response: status, data, error });
  }

  @Get()
  async findAll(@GetUser() user, @Res() res: Response): Promise<Response> {
    const { status, statusCode, data, error } = await this.orderService.findAll(
      user.id,
    );

    return res.status(statusCode).json({ response: status, data, error });
  }
}
