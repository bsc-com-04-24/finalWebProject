import { IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];

  @IsNumber()
  totalAmount: number;
}