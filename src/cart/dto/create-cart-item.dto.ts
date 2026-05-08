import { IsNumber, IsString, IsPositive } from "class-validator";
export class CreateCartItemDto{
    @IsNumber()
    productId!: number;

    @IsString()
    productName!: string;

    @IsNumber()
    @IsPositive()
    totalPrice!: number;

    @IsNumber()
    @IsPositive()
    itemCount!: number;

}

