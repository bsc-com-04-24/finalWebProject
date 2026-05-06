import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  placeOrder(@Body('cartId') cartId: number) {
    if (!cartId) {
      throw new Error('cartId is required');
    }
    return this.ordersService.placeOrder(cartId);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(Number(id));
  }

  @Get('buyer/:buyerId')
  getBuyerOrders(@Param('buyerId') buyerId: string) {
    return this.ordersService.getBuyerOrders(Number(buyerId));
  }

  @Get('seller/:sellerId')
  getSellerOrders(@Param('sellerId') sellerId: string) {
    return this.ordersService.getSellerOrders(Number(sellerId));
  }

  @Patch(':id')
  updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.ordersService.updateOrderStatus(Number(id), status);
  }
}