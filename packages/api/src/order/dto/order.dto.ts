import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

export class OrderedProduct {
  @IsMongoId({ message: 'The $property is not a valid value' })
  id: string;

  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'The $property is not a valid number' },
  )
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty({ message: 'The $property is empty' })
  name: string;

  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 2 },
    { message: 'The $property is not a valid number' },
  )
  @Min(1)
  total: number;

  @IsIn(['PENDING', 'IN PROGRESS', 'COMPLETED', 'CANCELLED'], {
    message: 'The $value is not a valid $property',
  })
  status: string;

  @IsArray()
  @ValidateNested({ each: true })
  products: OrderedProduct[];

  @IsMongoId({ message: 'The $property is not a valid value' })
  customer: string;
}
