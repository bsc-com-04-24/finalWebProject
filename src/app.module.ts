import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesService } from './services/services.service';
import { ServicesController } from './services/services.controller';
import { ServicesModule } from './services/services.module';
import { ServiceModule } from './service/service.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [ServicesModule, ServiceModule],
  controllers: [AppController, ServicesController],
  providers: [AppService, ServicesService],
})
export class AppModule {}
