import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty({ message: 'The $property is empty' })
  @IsString({ message: 'The $property is not a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The $property is not a string' })
  description: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'The $property is required' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'The $property has an invalid value' }
  )
  price: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'The $property is required' })
  @IsPositive()
  @Min(0)
  @IsInt({ message: 'The $property has an invalid value' })
  stock: string;
}
