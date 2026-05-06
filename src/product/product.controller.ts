import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  create(@Body() createProductDto: any) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query('sellerId') sellerId?: string) {
    if (sellerId) {
      return this.productsService.findBySeller(+sellerId);
    }
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}