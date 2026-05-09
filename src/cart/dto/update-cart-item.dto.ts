import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

}

