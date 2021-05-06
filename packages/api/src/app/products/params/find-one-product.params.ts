import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindOneProductParams {
  @IsNotEmpty()
  @IsMongoId({ message: '$property must be a valid MongoId' })
  id: string;
}
