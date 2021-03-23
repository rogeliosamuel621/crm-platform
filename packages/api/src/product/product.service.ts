import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceResponse } from 'src/interfaces/ServiceResponse';
import { CreateProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    userId: string,
  ): Promise<ServiceResponse> {
    try {
      // create an instance of a product
      const product = new this.productModel({
        ...createProductDto,
        owner: userId,
      });

      // save in database
      await product.save();

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        data: product,
      };
    } catch (error) {
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }
}
