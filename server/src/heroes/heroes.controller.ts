import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { Response } from 'express';
import {
  HeroCreateModel,
  HeroUpdateModel,
  UserViewModel,
} from '../models/models';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../utils/get-user.decorator';

@Controller('heroes')
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  @Get()
  async getHeroes() {
    const heroes = await this.heroesService.get();
    return heroes;
  }

  @Get(':id')
  async getHero(@Param('id', ParseIntPipe) id: number) {
    const hero = await this.heroesService.getById(id);
    return hero;
  }

  @Get(':id/avatar')
  async getAvatar(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const file = await this.heroesService.getImage(id);
    if (!file) {
      res.send('');
    } else {
      res.set('Content-Type', file.contentType).send(file.image).end();
    }
  }

  @Roles('admin')
  @Post()
  async create(@Body() hero: HeroCreateModel) {
    const newHero = await this.heroesService.create(hero);
    return newHero;
  }

  @Roles('admin')
  @Put(':id')
  async update(
    @Body() hero: HeroUpdateModel,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const updatedHero = await this.heroesService.update(id, hero);
    return updatedHero;
  }

  @Roles('admin')
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.heroesService.delete(id);
  }

  @Roles('user')
  @Patch(':id')
  async patch(
    @Body() hero: HeroUpdateModel,
    @GetUser() user: UserViewModel,
    @Param('id', ParseIntPipe) id: number,
  ) {
    if (user.isAdmin) {
      return this.heroesService.update(id, hero);
    } else {
      // regular users are only allowed to update fans and saves
      const heroToUpdate: HeroUpdateModel = {
        fans: hero.fans,
        saves: hero.saves,
      };
      return await this.heroesService.update(id, heroToUpdate);
    }
  }

  @Roles('admin')
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    // @Req() req: Request
  ) {
    const hero = await this.heroesService.getById(id);
    await this.heroesService.addOrUpdateAvatar(hero, file);
    return true;
    // const url = `${req.protocol}://${req.get('Host')}`;
    // hero.avatarUrl = `${url}/heroes/${hero.id}/avatar`;
    // return { avatar: hero.avatarUrl };
  }
}
