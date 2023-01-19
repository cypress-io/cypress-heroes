import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { generatePasswordHash } from '../src/utils/cypto';

const prisma = new PrismaClient();

async function main() {
  const data = await prisma.hero.findMany();

  if (data.length !== 0) {
    console.log('Database already seeded');
    return;
  }

  const flyingPower = await prisma.power.create({
    data: {
      name: 'Flying',
    },
  });
  const fireballPower = await prisma.power.create({
    data: {
      name: 'Fireball',
    },
  });

  const strengthPower = await prisma.power.create({
    data: {
      name: 'Super Strength',
    },
  });

  const invisibilityPower = await prisma.power.create({
    data: {
      name: 'Invisibility',
    },
  });

  const telekinesisPower = await prisma.power.create({
    data: {
      name: 'Telekinesis',
    },
  });

  const mindControlPower = await prisma.power.create({
    data: {
      name: 'Mind Control',
    },
  });

  const superHearingPower = await prisma.power.create({
    data: {
      name: 'Super Hearing',
    },
  });

  const superLogicsticsPower = await prisma.power.create({
    data: {
      name: 'Super Logistics',
    },
  });

  const superSpeedPower = await prisma.power.create({
    data: {
      name: 'Super Speed',
    },
  });

  await prisma.hero.create({
    data: {
      name: 'The Smoker',
      avatar: {
        create: {
          filename: 'hero1.png',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero1.png'),
        },
      },
      price: Math.floor(Math.random() * 100) + 1,
      saves: Math.floor(Math.random() * 100) + 1,
      fans: Math.floor(Math.random() * 100) + 1,
      powers: {
        connect: [{ id: fireballPower.id }],
      },
    },
  });

  await prisma.hero.create({
    data: {
      name: 'Warp Speed',
      avatar: {
        create: {
          filename: 'hero2.png',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero2.png'),
        },
      },
      price: Math.floor(Math.random() * 100) + 1,
      saves: Math.floor(Math.random() * 100) + 1,
      fans: Math.floor(Math.random() * 100) + 1,
      powers: {
        connect: [{ id: superSpeedPower.id }],
      },
    },
  });

  await prisma.hero.create({
    data: {
      name: 'Cyonic',
      avatar: {
        create: {
          filename: 'hero3.png',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero3.png'),
        },
      },
      price: Math.floor(Math.random() * 100) + 1,
      saves: Math.floor(Math.random() * 100) + 1,
      fans: Math.floor(Math.random() * 100) + 1,
      powers: {
        connect: [{ id: telekinesisPower.id }],
      },
    },
  });
  await prisma.hero.create({
    data: {
      name: 'The Librarian',
      avatar: {
        create: {
          filename: 'hero4.png',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero4.png'),
        },
      },
      price: Math.floor(Math.random() * 100) + 1,
      saves: Math.floor(Math.random() * 100) + 1,
      fans: Math.floor(Math.random() * 100) + 1,
      powers: {
        connect: [
          { id: superHearingPower.id },
          { id: superLogicsticsPower.id },
        ],
      },
    },
  });
  await prisma.hero.create({
    data: {
      name: 'Mr Angular',
      avatar: {
        create: {
          filename: 'hero5.png',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero5.png'),
        },
      },
      price: Math.floor(Math.random() * 100) + 1,
      saves: Math.floor(Math.random() * 100) + 1,
      fans: Math.floor(Math.random() * 100) + 1,
      powers: {
        connect: [{ id: strengthPower.id }],
      },
    },
  });
  await prisma.hero.create({
    data: {
      name: 'Collect Call Paul',
      avatar: {
        create: {
          filename: 'hero6.png',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero6.png'),
        },
      },
      price: Math.floor(Math.random() * 100) + 1,
      saves: Math.floor(Math.random() * 100) + 1,
      fans: Math.floor(Math.random() * 100) + 1,
      powers: {
        connect: [{ id: invisibilityPower.id }],
      },
    },
  });

  await prisma.hero.create({
    data: {
      name: 'Fly Girl',
      avatar: {
        create: {
          filename: 'hero7.png',
          contentType: 'image/jpeg',
          image: fs.readFileSync('./prisma/images/hero7.png'),
        },
      },
      price: Math.floor(Math.random() * 100) + 1,
      saves: Math.floor(Math.random() * 100) + 1,
      fans: Math.floor(Math.random() * 100) + 1,
      powers: {
        connect: [{ id: flyingPower.id }],
      },
    },
  });

  ///Users

  await prisma.user.create({
    data: {
      email: 'test@test.com',
      password: await generatePasswordHash('test123'),
      isAdmin: false,
    },
  });

  await prisma.user.create({
    data: {
      email: 'admin@test.com',
      password: await generatePasswordHash('test123'),
      isAdmin: true,
    },
  });
}

main();
