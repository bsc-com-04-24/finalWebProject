import { IsNumber, IsPositive, IsOptional } from "class-validator";

export class UpdateCartItemDto{
    @IsOptional()
    @IsNumber()
    @IsPositive()
    itemCount?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    totalPrice?: number;
}
