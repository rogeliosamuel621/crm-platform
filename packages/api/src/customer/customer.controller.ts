import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/authentication/decorators/getUser.decorator';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @GetUser() user,
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() res: Response,
  ): Promise<Response> {
    const {
      status,
      statusCode,
      data,
      error,
    } = await this.customerService.create(createCustomerDto, user.id);

    return res.status(statusCode).json({ response: status, data, error });
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@GetUser() user, @Res() res: Response) {
    const {
      status,
      statusCode,
      data,
      error,
    } = await this.customerService.findAll(user.id);

    return res.status(statusCode).json({ response: status, data, error });
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@GetUser() user, @Param() params, @Res() res: Response) {
    const {
      status,
      statusCode,
      data,
      error,
    } = await this.customerService.findOne(params.id, user.id);

    return res.status(statusCode).json({ response: status, data, error });
  }
}
