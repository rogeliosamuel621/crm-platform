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
  Res,
  HttpCode
} from '@nestjs/common';
import { CustomersService } from './customers.service';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { FindOneCustomerParams } from './params/find-one-customer.params';
import { UpdateCustomerParams } from './params/update-customer.params';
import { RemoveCustomerParams } from './params/remove-customer.params';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Post()
  @HttpCode(201)
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() payload: CreateCustomerDto,
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
    const { id } = user;
    const data = await this.service.findAll(id);

    return res.json({ response: 'success', data });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
    @CurrentUser() user: JwtPayload,
    @Param() params: FindOneCustomerParams,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.findOne(user.id, params.id);

    return res.json({ response: 'success', data });
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @CurrentUser() user: JwtPayload,
    @Param() params: UpdateCustomerParams,
    @Body() payload: UpdateCustomerDto,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.update(user.id, params.id, payload);

    return res.json({ response: 'success', data });
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(
    @CurrentUser() user: JwtPayload,
    @Param() params: RemoveCustomerParams,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.remove(user.id, params.id);

    return res.json({ response: 'success', data });
  }
}
