import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,

    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  // GET USER CART
  async getCart(user: User) {
    let cart = await this.cartRepo.findOne({
      where: {
        user: { id: user.id },
      },
      relations: ['items'],
    });

    // CREATE CART IF IT DOESN'T EXIST
    if (!cart) {
      cart = this.cartRepo.create({
        user,
        items: [],
      });

      cart = await this.cartRepo.save(cart);
    }

    return cart;
  }

  // ADD PRODUCT TO CART
  async addToCart(dto: AddToCartDto, user: User) {
    const cart = await this.getCart(user);

    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // CHECK IF PRODUCT ALREADY EXISTS IN CART
    const existingItem = cart.items.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity += dto.quantity;

      return this.cartItemRepo.save(existingItem);
    }

    const cartItem = this.cartItemRepo.create({
      cart,
      product,
      quantity: dto.quantity,
    });

    return this.cartItemRepo.save(cartItem);
  }

  // UPDATE CART ITEM QUANTITY
  async updateQuantity(
    itemId: number,
    dto: UpdateCartItemDto,
  ) {
    const item = await this.cartItemRepo.findOne({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    item.quantity = dto.quantity;

    return this.cartItemRepo.save(item);
  }

  // REMOVE ITEM FROM CART
  async removeItem(itemId: number) {
    const item = await this.cartItemRepo.findOne({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    return this.cartItemRepo.remove(item);
  }

  // CLEAR ENTIRE CART
  async clearCart(user: User) {
    const cart = await this.getCart(user);

    await this.cartItemRepo.remove(cart.items);

    return {
      message: 'Cart cleared successfully',
    };
  }
}