import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,

    ){}
    async addToCart(itemData: Partial<Cart>){
        const newItem = this.cartRepository.create(itemData);
        return await this.cartRepository.save(newItem);
    }
    async getCart(){
        const items = await this.cartRepository.find();
        const total = items.reduce((sum,item) => sum + Number(item.totalPrice), 0);
        return { items, total};
    }
    async updateCart(productId: number, itemCount: number){
        const item = await this.cartRepository.findOne({ where:{productId}});
        if (!item){
            throw new Error('Item not found in cart');
        }
        item.itemCount = itemCount;
        return await this.cartRepository.save(item);
    }
    async update(id: number,updateDto:UpdateCartItemDto){
        const item = await this.cartRepository.findOneBy({ id });
        if (!item){
            throw new NotFoundException('Cart item #${id} not found');
        }
        Object.assign(item,updateDto);
        return this.cartRepository.save(item);
    }

    async removeItem(productId: number){
        const result = await this.cartRepository.delete({productId});
        if (result.affected === 0){
            throw new Error('Item not found');
        }
        return { message: 'Item removed successfully'};
    }
    async clearCart(){
        await this.cartRepository.clear();
        return { message:'Cart cleared'};
    }
}



