import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'The $property is empty' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The $property is not a string' })
  description: string;

  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 2 },
    { message: 'The $property is not a valid number' },
  )
  @Min(1)
  price: number;

  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'The $property is not a valid number' },
  )
  @Min(1)
  stock: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty({ message: 'The $property is empty' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The $property is not a string' })
  description: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 2 },
    { message: 'The $property is not a valid number' },
  )
  @Min(1)
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'The $property is not a valid number' },
  )
  @Min(1)
  stock: number;
}
