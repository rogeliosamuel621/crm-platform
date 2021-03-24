import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/authentication/decorators/getUser.decorator';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(
    @GetUser() user,
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ): Promise<Response> {
    const {
      status,
      statusCode,
      data,
      error,
    } = await this.productService.create(createProductDto, user.id);

    return res.status(statusCode).json({ response: status, data, error });
  }

  @Get()
  async findAll(@GetUser() user, @Res() res: Response): Promise<Response> {
    const {
      status,
      statusCode,
      data,
      error,
    } = await this.productService.findAll(user.id);

    return res.status(statusCode).json({ response: status, data, error });
  }

  @Get(':id')
  async findOne(
    @GetUser() user,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const {
      status,
      statusCode,
      data,
      error,
    } = await this.productService.findOne(id, user.id);

    return res.status(statusCode).json({ response: status, data, error });
  }

  @Delete(':id')
  async remove(
    @GetUser() user,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const {
      status,
      statusCode,
      data,
      error,
    } = await this.productService.remove(id, user.id);

    return res.status(statusCode).json({ response: status, data, error });
  }
}
