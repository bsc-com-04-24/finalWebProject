import { Controller, Get, Post, Body, Param, Delete, Patch, Put, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Post()
    async addToCart(@Body() createCartItemDto:CreateCartItemDto){
        return await this.cartService.addToCart(createCartItemDto);

    }

    @Get()
    async getCart(){
        return await this.cartService.getCart();
    }

    @Put(':productId')
    async updateitemCount(@Param('productId',ParseIntPipe) productId: number,@Body('itemCount',ParseIntPipe) itemCount: number,){
        return await this.cartService.updateCart(productId,itemCount);


    }

    @Patch(':id')
    update(@Param('id') id: string,@Body() updateDto:UpdateCartItemDto){
        return this.cartService.update(+id,updateDto);
    }

    

    @Delete(':productId')
    async removeItem(@Param('productId',ParseIntPipe)productId: number){
         return await this.cartService.removeItem(productId);
    }

    @Delete()
    async clearCart(){
        return await this.cartService.clearCart();
    }

}


