import { BadRequestException, Injectable,NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./entities/cart.entity";
import { CartItem } from "./entities/cart-item.entity";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private itemRepo: Repository<CartItem>,
  ){}

  private async getOrCreateCart(buyerId: number) : Promise<Cart> {
    let cart = await this.cartRepo.findOne({
      where: { buyerId},
      relations: ['items', 'items.product', 'items.service'],
    });

    if (!cart) {
      cart = this.cartRepo.create({ buyerId});
      await this.cartRepo.save(cart);
    }
    return cart;
  }

  async findByBuyerId(buyerId: number){
    return this.getOrCreateCart(buyerId);
  }

  async addItem(dto: CreateCartItemDto) {
    if (!dto.productId && !dto.serviceId){
      throw new BadRequestException('Must provide productId or serviceId');
    }
    const cart = await this.getOrCreateCart(dto.buyerId);

    const existing = await this.itemRepo.findOne({
      where: {
        cartId: cart.id,
        productId: dto.productId || undefined,
        serviceId: dto.serviceId || undefined,
      },
    });

    if (existing) {
      existing.quantity += dto.quantity || 1;
      return this.itemRepo.save(existing);
    }

    const item = this.itemRepo.create({
      cartId: cart.id,
      productId: dto.productId,
      serviceId: dto.serviceId,
      quantity: dto.quantity || 1,
    });
    return this.itemRepo.save(item);
      
  }

  async updateItem(itemId: number, dto: UpdateCartItemDto){
    const item = await this.itemRepo.findOne({ where: { id: itemId}});
    if (!item) throw new NotFoundException( 'Cart item ${itemId} not found');

    Object.assign(item, dto);
    return this.itemRepo.save(item);

  }

  async removeItem(itemId: number){
    const result = await this.itemRepo.delete(itemId);
    if (result.affected === 0) {
      throw new NotFoundException('Cart item ${itemId} not found');
    }
    return { message:'Item removed'};
  }

  async clearCart(buyer: number) {
    const cart = await this.cartRepo.findOne({ where: { buyerId:buyer }});
    if (cart){
      await this.itemRepo.delete({ cartId: cart.id});
    }
    return { message: 'Cart cleared'};
  }
}

