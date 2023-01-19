import {
  AvatarImage,
  Hero as HeroDataModel,
  Power as PowerDataModel,
  User as UserDataModel,
  Prisma,
} from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  IsArray,
  IsOptional,
} from 'class-validator';

export class HeroViewModel implements HeroDataModel {
  id: number;
  name: string;
  price: number;
  saves: number;
  fans: number;
  powers: PowerViewModel[];

  @Expose({ name: 'avatarUrl' })
  @Transform(({ value, options, obj: hero }) => {
    if (!value?.id) {
      return value;
    }
    const req = (options as any).request;
    return `${req.protocol}://${req.get('Host')}/heroes/${hero.id}/avatar`;
  })
  avatar: AvatarImage;

  @Exclude() createdAt;
  @Exclude() updatedAt;

  constructor(partial: Partial<HeroDataModel>) {
    Object.assign(this, partial);
  }
}

export class HeroCreateModel
  implements
    Omit<
      Prisma.HeroCreateInput,
      'createdAt' | 'updatedAt' | 'avatar' | 'powers'
    >
{
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be an empty string' })
  name: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(1, { message: 'Price must be greater or equal to 1' })
  price: number;

  @IsNumber({}, { message: 'Saves must be a number' })
  @Min(0, { message: 'Saves must be greater or equal to 0' })
  saves: number;

  @IsNumber({}, { message: 'Fans must be a number' })
  @Min(0, {
    message: 'Fans must be greater or equal to 0',
  })
  fans: number;

  @IsArray({ message: 'Powers must be an array' })
  powers?: number[];
}

export class HeroUpdateModel implements Partial<HeroCreateModel> {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be an empty string' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(1, { message: 'Price must be greater or equal to 1' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Saves must be a number' })
  @Min(0, { message: 'Saves must be greater or equal to 0' })
  saves?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Fans must be a number' })
  @Min(0, {
    message: 'Fans must be greater or equal to 0',
  })
  fans?: number;

  @IsOptional()
  @IsArray({ message: 'Powers must be an array' })
  powers?: number[];
}

export class PowerViewModel implements PowerDataModel {
  id: number;
  name: string;
  // heroId: number;
}

export class UserViewModel implements UserDataModel {
  id: number;
  email: string;
  @Exclude() password: string;
  isAdmin: boolean;
}
