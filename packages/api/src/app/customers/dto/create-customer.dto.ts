import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'The $property is empty' })
  @IsString({ message: 'The $property is not a string' })
  name: string;

  @IsNotEmpty({ message: 'The $property is empty' })
  @IsEmail({}, { message: 'the $value is not an email' })
  email: string;

  @IsOptional()
  @IsString({ message: 'The $property is not a string' })
  position?: string;

  @IsOptional()
  @IsString({ message: 'The $property is not a string' })
  company?: string;
}
