import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceResponse } from 'src/interfaces/ServiceResponse';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
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

  async findAll(userId: string): Promise<ServiceResponse> {
    try {
      // get the products of the current user
      const products = await this.productModel.find({ owner: userId });

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: products || [],
      };
    } catch (error) {
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }

  async findOne(id: string, userId: string): Promise<ServiceResponse> {
    try {
      // get a product by id
      const product = await this.productModel.findOne({ _id: id });

      // check if the product exists
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // check if the user is the owner of the product
      if (product.owner.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to perform this operation',
        );
      }

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
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

  async update(
    id: string,
    userId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ServiceResponse> {
    try {
      // get a product by id
      const product = await this.productModel.findOne({ _id: id });

      // check if the product exists
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // check if the user is the owner of the product
      if (product.owner.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to perform this operation',
        );
      }

      const updatedProduct = await this.productModel.findOneAndUpdate(
        {
          _id: product.id,
        },
        { ...updateProductDto },
        { new: true },
      );

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: updatedProduct,
      };
    } catch (error) {
      return {
        status: 'fail',
        statusCode: error.response.statusCode,
        error: error.message,
      };
    }
  }

  async remove(id: string, userId: string): Promise<ServiceResponse> {
    try {
      // get a product by id
      const product = await this.productModel.findOne({ _id: id });

      // check if the product exists
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // check if the user is the owner of the product
      if (product.owner.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to perform this operation',
        );
      }

      // remove the product
      await this.productModel.findOneAndRemove({ _id: product.id });

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: 'Product deleted successfully',
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
