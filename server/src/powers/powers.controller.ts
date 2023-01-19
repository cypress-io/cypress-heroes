import { Controller, Get } from '@nestjs/common';
import { PowersService } from './powers.service';

@Controller('powers')
export class PowersController {
  constructor(private powersService: PowersService) {}

  @Get()
  async getHeroes() {
    const powers = await this.powersService.get();
    return powers;
  }
}
