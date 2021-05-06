import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateProductParams {
  @IsNotEmpty()
  @IsMongoId({ message: '$property must be a valid MongoId' })
  id: string;
}
