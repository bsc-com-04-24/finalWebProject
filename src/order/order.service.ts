import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  // CREATE ORDER
  async create(dto: CreateOrderDto, user: User) {
    const order = this.orderRepo.create({
      user,
      items: dto.items,
      totalAmount: dto.totalAmount,
    });

    return this.orderRepo.save(order);
  }

  // GET ALL ORDERS (FOR LOGGED-IN USER)
  findAll(user: User) {
    return this.orderRepo.find({
      where: { user: { id: user.id } },
    });
  }

  // GET SINGLE ORDER
  async findOne(id: number, user: User) {
    const order = await this.orderRepo.findOne({
      where: {
        id,
        user: { id: user.id },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  // DELETE ORDER
  async remove(id: number, user: User) {
    const order = await this.findOne(id, user);
    return this.orderRepo.remove(order);
  }
}