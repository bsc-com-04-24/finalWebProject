import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

const modelCart = {
  id: 1,
  buyerId: 1,
  items: [
    { itemId: 101, type: 'product', price: 500, sellerId: 10, title: 'Phone' },
    { itemId: 201, type: 'service', price: 100, sellerId: 10, time: '2pm', location: 'Lilongwe' },
    { itemId: 102, type: 'product', price: 300, sellerId: 11, title: 'Laptop' },
  ],
};

@Injectable()
export class OrderService {
  private orders: any[] = [];

  create(createOrderDto: CreateOrderDto) {
    const cartId = (createOrderDto as any).cartId;
    const cart = modelCart;
    if (!cart || cart.id !== cartId) {
      throw new NotFoundException(`Cart with id ${cartId} not found`);
    }

    const buyerId = cart.buyerId;

    const itemsBySeller: Record<number, any[]> = {};
    for (const item of cart.items) {
      if (!itemsBySeller[item.sellerId]) {
        itemsBySeller[item.sellerId] = [];
      }
      itemsBySeller[item.sellerId].push(item);
    }

    const createdOrders: any[] = [];
    for (const [sellerId, items] of Object.entries(itemsBySeller)) {
      const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

      const newOrder: any = {
        id: this.orders.length + 1,
        buyerId,
        sellerId: Number(sellerId),
        cartId,
        items,
        totalAmount,
        status: 'pending',
        createdAt: new Date(),
      };

      this.orders.push(newOrder);
      createdOrders.push(newOrder);

      console.log(`Notification to buyer ${buyerId}: Order ${newOrder.id} placed with seller ${sellerId}`);
    }

    console.log(`Cart ${cartId} cleared after order placement`);

    return createdOrders;
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }

  findByBuyer(buyerId: number) {
    return this.orders.filter((o) => o.buyerId === buyerId);
  }

  findBySeller(sellerId: number) {
    return this.orders.filter((o) => o.sellerId === sellerId);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    order.status = (updateOrderDto as any).status;
    return order;
  }

  remove(id: number) {
    const index = this.orders.findIndex((o) => o.id === id);
    if (index === -1) throw new NotFoundException(`Order with id ${id} not found`);
    this.orders.splice(index, 1);
    return { message: `Order ${id} removed successfully` };
  }
}