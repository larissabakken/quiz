import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('quiz')
  async findAll() {
    return this.appService.findAll();
  }

    @Get('quiz/:id')
    async findOne(@Param('id') id: any) {
        return this.appService.findOne(id);
    }
}
