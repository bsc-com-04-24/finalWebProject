import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';


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
entities: [Cart],
logging: true,
}),
}),

CartsModule,
],
})
export class AppModule {}
