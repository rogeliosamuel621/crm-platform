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

import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

import { FindOneProductParams } from './params/find-one-product.params';
import { RemoveProductParams } from './params/remove-product.params';
import { UpdateProductParams } from './params/update-product.params';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  @HttpCode(201)
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() payload: CreateProductDto,
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
    @Param() params: FindOneProductParams,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.findOne(user.id, params.id);

    return res.json({ response: 'success', data });
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: JwtPayload,
    @Param() params: UpdateProductParams,
    @Body() payload: UpdateProductDto,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.update(user.id, params.id, payload);

    return res.json({ response: 'success', data });
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(
    @CurrentUser() user: JwtPayload,
    @Param() params: RemoveProductParams,
    @Res() res: Response
  ): Promise<Response> {
    const data = await this.service.remove(user.id, params.id);

    return res.json({ response: 'success', data });
  }
}
