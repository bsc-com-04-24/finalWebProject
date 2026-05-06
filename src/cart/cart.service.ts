import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CartsService {
  private carts: any[] = [
    {
      id: 1,
      buyerId: 1,
      items: [
        { itemId: 101, type: 'product', price: 500, sellerId: 10, title: 'Phone' },
        { itemId: 201, type: 'service', price: 100, sellerId: 10, time: '2pm', location: 'Lilongwe' },
      ],
    },
  ];

  createCart(buyerId: number) {
    const newCart: any = {
      id: this.carts.length + 1,
      buyerId,
      items: [],
    };
    this.carts.push(newCart);
    return newCart;
  }

  getCartByBuyerId(buyerId: number) {
    const cart = this.carts.find((c) => c.buyerId === buyerId);
    if (!cart) throw new NotFoundException(`Cart for buyer ${buyerId} not found`);
    return cart;
  }

  addItemToCart(buyerId: number, item: { itemId: number; type: string; price: number; sellerId: number; title?: string; time?: string; location?: string }) {
    const cart = this.carts.find((c) => c.buyerId === buyerId);
    if (!cart) throw new NotFoundException(`Cart for buyer ${buyerId} not found`);
    cart.items.push(item);
    return cart;
  }

  removeItemFromCart(buyerId: number, itemId: number) {
    const cart = this.carts.find((c) => c.buyerId === buyerId);
    if (!cart) throw new NotFoundException(`Cart for buyer ${buyerId} not found`);
    cart.items = cart.items.filter((i) => i.itemId !== itemId);
    return cart;
  }

  clearCart(buyerId: number) {
    const cart = this.carts.find((c) => c.buyerId === buyerId);
    if (!cart) throw new NotFoundException(`Cart for buyer ${buyerId} not found`);
    cart.items = [];
    return cart;
  }
}