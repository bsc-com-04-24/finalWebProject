import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { CartService } from './cart.service';

import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService){}

  @Get(':buyerId')
  findByBuyerId(@Param('buyerId',ParseIntPipe) buyerId: number) {
    return this.cartService.findByBuyerId(buyerId);
  }

  @Post('items')
  addItem(@Body() dto: CreateCartItemDto) {
    return this.cartService.addItem(dto);
  }

  @Patch('items/:itemId')
  updateItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartItemDto,
  ){
    return this.cartService.updateItem(itemId, dto);
  }

  @Delete('items/:itemId')
  removeItem(@Param('itemId',ParseIntPipe) itemId: number){
    return this.cartService.removeItem(itemId);

  }

  @Delete(':buyerId/clear')
  clearCart(@Param('buyerId',ParseIntPipe) buyerId: number){
    return this.cartService.clearCart(buyerId);
  }
}


