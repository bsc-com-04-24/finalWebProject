import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './service.controller';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [ServiceService],
})
export class ServicesModule {}