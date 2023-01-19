import { Injectable } from '@nestjs/common';
import { UserViewModel } from '../models/models';
import { mapper } from '../utils/mapper';
import { PrismaService } from '../utils/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getByUsername(username: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email: username,
      },
    });
    return mapper(new UserViewModel(), user);
  }
}
