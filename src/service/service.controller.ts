import { Controller, Post, Put, Delete, Get, Param, Body } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServiceService) {}

  @Post()
  createService(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @Put(':id')
  updateService(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.servicesService.update(parseInt(id, 10), dto);
  }

  @Delete(':id')
  deleteService(@Param('id') id: string) {
    return this.servicesService.remove(parseInt(id, 10));
  }

  @Get(':id')
  getServiceById(@Param('id') id: string) {
    return this.servicesService.findOne(parseInt(id, 10));
  }

  @Get()
  getAllServices() {
    return this.servicesService.findAll();
  }
}
