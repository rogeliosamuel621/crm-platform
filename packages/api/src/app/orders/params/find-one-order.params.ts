import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindOneOrderParams {
  @IsNotEmpty()
  @IsMongoId({ message: '$property must be a valid MongoId' })
  id: string;
}
