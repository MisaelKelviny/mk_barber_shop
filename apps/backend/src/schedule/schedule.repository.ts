import { Schedule } from '@barber/core';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ScheduleRepository implements ScheduleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(schedule: Schedule): Promise<void> {
    await this.prismaService.schedule.create({
      data: {
        date: schedule.date,
        clientEmail: schedule.clientEmail,
        professional: { connect: { id: schedule.professional.id } },
        services: {
          connect: schedule.services.map((servico) => ({ id: servico.id })),
        },
      },
    });
  }

  async searchForEmail(email: string): Promise<Schedule[]> {
    return this.prismaService.schedule.findMany({
      where: {
        clientEmail: email,
        date: {
          gte: new Date(),
        },
      },
      include: {
        services: true,
        professional: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async searchForProfessionalAndDate(
    professional: number,
    date: Date,
  ): Promise<Schedule[]> {
    const year = date.getFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const startDay = new Date(year, month, day, 0, 0, 0);
    const endDay = new Date(year, month, day, 23, 59, 59);

    const resultado: any = await this.prismaService.schedule.findMany({
      where: {
        professionalId: professional,
        date: {
          gte: startDay,
          lte: endDay,
        },
      },
      include: { services: true },
    });

    return resultado;
  }
}
