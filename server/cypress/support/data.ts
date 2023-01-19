import { Prisma, PrismaClient } from '@prisma/client';

const client = new PrismaClient();
// client.$connect();
// client.

export async function createHero() {
  const hero: Prisma.HeroCreateInput = {
    name: 'Test Hero',
    price: 1,
    saves: 1,
    fans: 1,
    powers: {
      connect: [{ id: 1 }],
    },
  };
  const createdHero = await client.hero.create({
    data: hero,
  });
  return client.hero.findUniqueOrThrow({
    where: {
      id: createdHero.id,
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
}

export async function deleteHero(id: number) {
  await client.avatarImage.deleteMany({
    where: {
      heroId: id,
    },
  });
  return await client.hero.deleteMany({
    where: {
      id,
    },
  });
}
