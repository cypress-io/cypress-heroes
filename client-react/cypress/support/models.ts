import {
  AvatarImage,
  Hero as HeroDataModel,
  Power as PowerDataModel,
  User as UserDataModel,
  Prisma,
} from '../../../server/node_modules/@prisma/client';

export * as Prisma from '../../../server/node_modules/@prisma/client';

// export class HeroViewModel implements HeroDataModel {
//   id: number;
//   name: string;
//   price: number;
//   saves: number;
//   fans: number;
//   powers: PowerViewModel[];

// }

// export class HeroCreateModel
//   implements
//     Omit<
//       Prisma.HeroCreateInput,
//       'createdAt' | 'updatedAt' | 'avatar' | 'powers'
//     >
// {

// }

// export class HeroUpdateModel implements Partial<HeroCreateModel> {

// }

// export class PowerViewModel implements PowerDataModel {
//   id!: number;
//   name!: string;
// }

// export class UserViewModel implements UserDataModel {
//   id!: number;
//   email!: string;
//   isAdmin!: boolean;
// }
