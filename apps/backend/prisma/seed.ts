import { professionals, services } from '@barber/core';
import { PrismaClient } from '@prisma/client';
import {
  Professional as PrismaProfessional,
  Service as PrismaServices,
} from 'prisma/prisma-client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.professional.createMany({
    data: professionals as PrismaProfessional[],
  });
  await prisma.service.createMany({ data: services as PrismaServices[] });
}

seed();
