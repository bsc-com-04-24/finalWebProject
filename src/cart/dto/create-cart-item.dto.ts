import { IsNumber, IsOptional, Min } from "class-validator";
export class CreateCartItemDto{
    @IsNumber()
    buyerId!: number;

    @IsOptional()
    @IsNumber()
    productId?: number;


    @IsOptional()
    @IsNumber()
    serviceId?: number;
    
    

    @IsOptional()
    @IsNumber()
    @Min(1)
    quantity?: number = 1;
    
    

}


