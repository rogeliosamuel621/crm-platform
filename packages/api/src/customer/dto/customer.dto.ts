import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'The $property is empty' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The $property is not a string' })
  position: string;

  @IsOptional()
  @IsString({ message: 'The $property is not a string' })
  company: string;

  @IsEmail({}, { message: 'the $property is not a valid email' })
  email: string;
}

export class UpdateCustomerDto {
  @IsOptional()
  @IsNotEmpty({ message: 'The $property is empty' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The $property is not a string' })
  position: string;

  @IsOptional()
  @IsString({ message: 'The $property is not a string' })
  company: string;

  @IsOptional()
  @IsEmail({}, { message: 'the $property is not a valid email' })
  email: string;
}
