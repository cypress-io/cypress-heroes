import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { HeroesController } from './heroes/heroes.controller';
import { HeroesService } from './heroes/heroes.service';
import { PrismaService } from './utils/prisma.service';
import { PowersService } from './powers/powers.service';
import { PowersController } from './powers/powers.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/auth.guard';
import { EntityNotFoundFilter } from './utils/entity-not-found.filter';
import { TransformerInterceptor } from './utils/transformer.interceptor';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [HeroesController, PowersController],
  providers: [
    HeroesService,
    PrismaService,
    PowersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundFilter,
    },
  ],
})
export class AppModule {}
