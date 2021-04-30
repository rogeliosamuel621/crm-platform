import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ValidateUserDto {
  @IsNotEmpty({ message: 'The $property is empty' })
  @IsEmail({}, { message: 'the $value is not an email' })
  email: string;

  @IsString({ message: 'The $property is not a string' })
  @MinLength(6, {
    message: '$property is too short'
  })
  password: string;
}
