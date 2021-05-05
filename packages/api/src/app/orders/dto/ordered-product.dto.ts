import { IsMongoId, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderedProductDto {
  @IsMongoId({ message: 'The $property is not a valid value' })
  product: string;

  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'The $property is not a valid number' }
  )
  quantity: number;
}
