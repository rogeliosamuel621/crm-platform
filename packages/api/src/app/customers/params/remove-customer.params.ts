import { IsMongoId, IsNotEmpty } from 'class-validator';

export class RemoveCustomerParams {
  @IsNotEmpty()
  @IsMongoId({ message: '$property must be a valid MongoId' })
  id: string;
}
