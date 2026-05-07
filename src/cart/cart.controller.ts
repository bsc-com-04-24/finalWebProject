import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CartService } from './cart.service';

import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  
  @Get()
  getCart() {
    const fakeUser = { id: 1 } as any;

    return this.cartService.getCart(fakeUser);
  }

  
  @Post()
  addToCart(@Body() dto: AddToCartDto) {
    const fakeUser = { id: 1 } as any;

    return this.cartService.addToCart(dto, fakeUser);
  }

  
  @Patch(':id')
  updateQuantity(
    @Param('id') id: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateQuantity(+id, dto);
  }

  
  @Delete(':id')
  removeItem(@Param('id') id: number) {
    return this.cartService.removeItem(+id);
  }

  
  @Delete()
  clearCart() {
    const fakeUser = { id: 1 } as any;

    return this.cartService.clearCart(fakeUser);
  }
}
