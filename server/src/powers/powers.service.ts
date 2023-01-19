import { Injectable } from '@nestjs/common';
import { PowerViewModel } from '../models/models';
import { mapper } from '../utils/mapper';
import { PrismaService } from '../utils/prisma.service';

@Injectable()
export class PowersService {
  constructor(private prismaService: PrismaService) {}

  async get() {
    const powerDataModels = await this.prismaService.power.findMany();
    const powers = powerDataModels.map(p => mapper(new PowerViewModel(), p));
    return  powers;
  }
}
