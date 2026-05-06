import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [OrdersModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
