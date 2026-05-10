<<<<<<< HEAD
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
=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
>>>>>>> origin/main
