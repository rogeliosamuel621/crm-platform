import { Response } from 'express';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Res
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

import { OrdersService } from './orders.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

import { FindOneOrderParams } from './params/find-one-order.params';
import { UpdateOrderParams } from './params/update-order.params';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  @HttpCode(201)
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() payload: CreateOrderDto,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.create(user.id, payload);

    return res.json({ response: 'success', data });
  }

  @Get()
  @HttpCode(200)
  async findAll(
    @CurrentUser() user: JwtPayload,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.findAll(user.id);

    return res.json({ response: 'success', data });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
    @CurrentUser() user: JwtPayload,
    @Param() params: FindOneOrderParams,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.findOne(user.id, params.id);

    return res.json({ response: 'success', data });
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @CurrentUser() user: JwtPayload,
    @Param() params: UpdateOrderParams,
    @Body() payload: UpdateOrderDto,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.update(user.id, params.id, payload);

    return res.json({ response: 'success', data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
