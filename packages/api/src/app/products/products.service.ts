import { Model } from 'mongoose';
import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product, ProductDocument } from './entities/product.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>
  ) {}

  async create(userId: string, payload: CreateProductDto): Promise<Product> {
    // create an object of a product
    const product = new this.model({
      ...payload,
      owner: userId
    });

    return await product.save();
  }

  async findAll(userId: string): Promise<Product[]> {
    // find all products of the user
    const products: Product[] = await this.model.find({ owner: userId });

    return products || [];
  }

  async findOne(userId: string, id: string): Promise<Product> {
    // find the requested product
    const product: Product = await this.model.findOne({ _id: id });

    // throw an error if the product doesn't exists
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // verify that the user is the owner of the product
    const isUserTheOwner = `${product.owner}` === userId;
    if (!isUserTheOwner) {
      throw new ForbiddenException('You cannot access this information');
    }

    return product;
  }

  async update(
    userId: string,
    id: string,
    payload: UpdateProductDto
  ): Promise<Product> {
    // make sure that the product exists
    await this.findOne(userId, id);

    // update and return the updated product
    return this.model.findOneAndUpdate(
      { _id: id },
      { ...payload },
      { new: true }
    );
  }

  async remove(userId: string, id: string): Promise<string> {
    // make sure that the product exists
    await this.findOne(userId, id);

    // delete the product
    await this.model.findOneAndRemove({ _id: id });

    return 'Product deleted successfully';
  }
}
