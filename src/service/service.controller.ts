import { Controller, Post, Put, Delete, Get, Param, Body } from '@nestjs/common';
import { ServicesService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

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
    return this.servicesService.delete(parseInt(id, 10));
  }

  @Get(':id')
  getServiceById(@Param('id') id: string) {
    return this.servicesService.findById(parseInt(id, 10));
  }

  @Get()
  getAllServices() {
    return this.servicesService.findAll();
  }
}
