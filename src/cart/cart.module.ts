import { Module } from '@nestjs/common';
import { CartsController } from './cart.controller';
import { CartsService } from './cart.service';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}