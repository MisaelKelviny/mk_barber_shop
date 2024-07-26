import { profissionais, services } from '@barba/core';
import { PrismaClient } from '@prisma/client';
import {
  Profissional as PrismaProfissional,
  Servico as PrismaServico,
} from 'prisma/prisma-client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.professional.createMany({
    data: profissionais as PrismaProfissional[],
  });
  await prisma.servico.createMany({ data: services as PrismaServico[] });
}

seed();
