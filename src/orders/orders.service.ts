import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

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
export class OrdersService {
  private orders: any[] = [];

  placeOrder(cartId: number) {
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

  getOrderById(id: number) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }

  getBuyerOrders(buyerId: number) {
    return this.orders.filter((o) => o.buyerId === buyerId);
  }

  getSellerOrders(sellerId: number) {
    return this.orders.filter((o) => o.sellerId === sellerId);
  }

  updateOrderStatus(id: number, status: string) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    order.status = status;
    return order;
  }
}