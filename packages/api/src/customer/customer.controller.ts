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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/customer.dto';

@Controller('customer')
@UseGuards(AuthGuard())
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
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
  async findOne(
    @GetUser() user,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const {
      status,
      statusCode,
      data,
      error,
    } = await this.customerService.findOne(id, user.id);

    return res.status(statusCode).json({ response: status, data, error });
  }

  @Delete(':id')
  async remove(@GetUser() user, @Param('id') id: string, @Res() res: Response) {
    const {
      status,
      statusCode,
      data,
      error,
    } = await this.customerService.remove(id, user.id);

    return res.status(statusCode).json({ response: status, data, error });
  }
}
