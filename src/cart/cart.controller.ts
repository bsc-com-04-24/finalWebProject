
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CartsService } from './cart.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  createCart(@Body('buyerId') buyerId: number) {
    if (!buyerId) {
      throw new Error('buyerId is required');
    }
    return this.cartsService.createCart(buyerId);
  }

  @Get('buyer/:buyerId')
  getCartByBuyerId(@Param('buyerId') buyerId: string) {
    return this.cartsService.getCartByBuyerId(Number(buyerId));
  }

  @Post('buyer/:buyerId/item')
  addItemToCart(
    @Param('buyerId') buyerId: string,
    @Body() item: { itemId: number; type: string; price: number; sellerId: number; title?: string; time?: string; location?: string },
  ) {
    return this.cartsService.addItemToCart(Number(buyerId), item);
  }

  @Delete('buyer/:buyerId/item/:itemId')
  removeItemFromCart(
    @Param('buyerId') buyerId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.cartsService.removeItemFromCart(Number(buyerId), Number(itemId));
  }

  @Delete('buyer/:buyerId')
  clearCart(@Param('buyerId') buyerId: string) {
    return this.cartsService.clearCart(Number(buyerId));
  }
}