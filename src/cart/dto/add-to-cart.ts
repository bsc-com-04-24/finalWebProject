import { IsInt } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  productId!: number;

  @IsInt()
  quantity!: number;
}