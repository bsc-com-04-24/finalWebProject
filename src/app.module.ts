import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartsModule } from './cart/cart.module';

@Module({
  imports: [CartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

