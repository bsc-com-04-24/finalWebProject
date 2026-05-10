<<<<<<< HEAD
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
=======
import { Module } from '@nestjs/common'; 
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UserModule } from './user/user.module'; 
import { User } from './user/entities/user.entity'; 
 
@Module({ 
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRootAsync({ 
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (config: ConfigService) => ({ 
        type: 'oracle', 
        host: config.get('DB_HOST'), 
        port: parseInt(config.get('DB_PORT') ?? '1521'), 
        username: config.get('DB_USERNAME'), 
        password: config.get('DB_PASSWORD'), 
        serviceName: config.get('DB_SERVICE_NAME'), 
        synchronize: config.get('DB_SYNCHRONIZE') === 'true', 
        entities: [User], 
        logging: true, 
      }), 
    }), 
    UserModule 
  ], 
}) 
export class AppModule {} 
>>>>>>> origin/main
