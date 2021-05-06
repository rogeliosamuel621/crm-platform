import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';

import { OrderStatusEnum } from '../enums/order-status.enum';
import { OrderedProductDto } from './ordered-product.dto';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'The $property is empty' })
  @IsString({ message: 'The $property is not a string' })
  title: string;

  @IsOptional()
  @IsString({ message: 'The $property is not a string' })
  description?: string;

  @IsOptional()
  @IsIn(Object.values(OrderStatusEnum), {
    message: 'The $property is not a valid status'
  })
  @IsString({ message: 'The $property is not a string' })
  status?: OrderStatusEnum;

  @IsArray()
  @ValidateNested({ each: true })
  products: OrderedProductDto[];

  @IsMongoId({ message: 'The $property is not a valid value' })
  customer: string;
}
