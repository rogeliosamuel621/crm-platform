import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateCustomerParams {
  @IsNotEmpty()
  @IsMongoId({ message: '$property must be a valid MongoId' })
  id: string;
}
