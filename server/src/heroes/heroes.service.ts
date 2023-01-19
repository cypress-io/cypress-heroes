/// <reference types="@types/multer" />

import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import {
  HeroViewModel,
  HeroUpdateModel,
  HeroCreateModel,
} from '../models/models';
import { PrismaService } from '../utils/prisma.service';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class HeroesService {
  constructor(
    private prismaService: PrismaService,
    @Inject(REQUEST) private req: Request,
  ) {}

  async get() {
    const heroDataModels = await this.prismaService.hero.findMany({
      include: {
        powers: true,
        avatar: {
          select: {
            id: true,
          },
        },
      },
    });
    const heroes = heroDataModels.map((hero) => new HeroViewModel(hero));
    return heroes;
  }

  async getById(id: number) {
    const heroDataModel = await this.prismaService.hero.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        powers: true,
        avatar: {
          select: {
            id: true,
          },
        },
      },
    });
    const hero = new HeroViewModel(heroDataModel);
    return hero;
  }

  async getImage(id: number) {
    const heroDataModel = await this.prismaService.hero.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        avatar: true,
      },
    });
    if (!heroDataModel.avatar) {
      throw new NotFoundException();
    }

    return heroDataModel.avatar;
  }

  async create(hero: HeroCreateModel) {
    const { powers, ...rest } = hero;
    const heroToCreate: Prisma.HeroCreateInput = {
      ...rest,
      powers: {
        connect: powers.map((x) => ({ id: x })),
      },
      avatar: {},
    };
    const newHero = await this.prismaService.hero.create({
      data: heroToCreate,
    });
    return this.getById(newHero.id);
  }

  async update(id: number, hero: HeroUpdateModel) {
    const { powers, ...rest } = hero;
    const heroToUpdate: Prisma.HeroUpdateInput = {
      ...rest,
      powers: {
        set: powers?.map((x) => ({ id: x })),
      },
    };
    const updatedHero = await this.prismaService.hero.update({
      where: {
        id,
      },
      data: heroToUpdate,
    });
    return this.getById(updatedHero.id);
  }

  async delete(id: number) {
    await this.prismaService.avatarImage.deleteMany({
      where: {
        heroId: id,
      },
    });
    await this.prismaService.hero.deleteMany({
      where: {
        id,
      },
    });
  }

  async addOrUpdateAvatar(hero: HeroViewModel, file: Express.Multer.File) {
    if (hero.id) {
      return await this.prismaService.avatarImage.upsert({
        where: {
          heroId: hero.id,
        },
        update: {
          image: file.buffer,
          filename: file.fieldname,
          contentType: file.mimetype,
        },
        create: {
          image: file.buffer,
          filename: file.fieldname,
          contentType: file.mimetype,
          heroId: hero.id,
        },
      });
    }
  }
}
