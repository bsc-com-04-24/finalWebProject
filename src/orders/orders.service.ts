import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private orders: Array<{
    id: number;
    buyerId: number;
    sellerId: number;
    productId: number;
    serviceIds: number[];
    location: string | null;
    status: string;
  }> = [
    {
      id: 1,
      buyerId: 1,
      sellerId: 2,
      productId: 500,
      serviceIds: [401],
      location: 'lilongwe',
      status: 'pending',
    },
    {
      id: 2,
      buyerId: 102,
      sellerId: 202,
      productId: 302,
      serviceIds: [] as number[],
      location: null,
      status: 'confirmed',
    },
  ];

  placeOrder(orderData: {
    buyerId: number;
    sellerId: number;
    productId: number;
    serviceIds?: number[];
    location?: string;
  }) {
    const newOrder = {
      id: this.orders.length + 1,
      buyerId: orderData.buyerId,
      sellerId: orderData.sellerId,
      productId: orderData.productId,
      serviceIds: orderData.serviceIds || [],
      location: orderData.location || null,
      status: 'pending',
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  getOrderById(id: number) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }

  getBuyerOrders(buyerId: number) {
    return this.orders.filter((order) => order.buyerId === buyerId);
  }

  getSellerOrders(sellerId: number) {
    return this.orders.filter((order) => order.sellerId === sellerId);
  }

  updateOrderStatus(id: number, status: string) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    order.status = status;
    return order;
  }
}