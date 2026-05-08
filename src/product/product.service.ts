import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private nextId = 1;

  create(createProductDto: CreateProductDto) {
    const product: Product = {
      id: this.nextId++,
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  findBySeller(sellerId: number) {
    return this.products.filter((p) => p.sellerId === sellerId);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id);
    
    Object.assign(product, updateProductDto, { updatedAt: new Date() });
    return product;
  }

  remove(id: number) {
    // const product = this.findOne(id);
    this.products = this.products.filter((p) => p.id !== id);
    return { message: `Product with ID ${id} has been deleted` };
  }
}
