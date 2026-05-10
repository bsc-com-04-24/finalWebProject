import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // CREATE ORDER
  @Post()
  create(@Body() dto: CreateOrderDto) {
    const fakeUser = { id: 1 } as any; // replace with req.user
    return this.ordersService.create(dto, fakeUser);
  }

  // GET ALL ORDERS
  @Get()
  findAll() {
    const fakeUser = { id: 1 } as any;
    return this.ordersService.findAll(fakeUser);
  }

  // GET ONE ORDER
  @Get(':id')
  findOne(@Param('id') id: number) {
    const fakeUser = { id: 1 } as any;
    return this.ordersService.findOne(+id, fakeUser);
  }

  // DELETE ORDER
  @Delete(':id')
  remove(@Param('id') id: number) {
    const fakeUser = { id: 1 } as any;
    return this.ordersService.remove(+id, fakeUser);
  }
}