import { Agendamento } from '@barba/core';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ScheduleRepository implements RepositorySchedule {
  constructor(private readonly prismaService: PrismaService) {}

  async criar(schedule: Agendamento): Promise<void> {
    await this.prismaService.schedule.create({
      data: {
        data: schedule.data,
        clientEmail: schedule.clientEmail,
        professional: { connect: { id: schedule.professional.id } },
        services: {
          connect: schedule.services.map((servico) => ({ id: servico.id })),
        },
      },
    });
  }

  async buscarPorEmail(email: string): Promise<Agendamento[]> {
    return this.prismaService.schedule.findMany({
      where: {
        clientEmail: email,
        data: {
          gte: new Date(),
        },
      },
      include: {
        services: true,
        professional: true,
      },
      orderBy: {
        data: 'desc',
      },
    });
  }

  async buscarPorProfissionalEData(
    professional: number,
    data: Date,
  ): Promise<Agendamento[]> {
    const ano = data.getFullYear();
    const mes = data.getUTCMonth();
    const dia = data.getUTCDate();

    const inicioDoDia = new Date(ano, mes, dia, 0, 0, 0);
    const fimDoDia = new Date(ano, mes, dia, 23, 59, 59);

    const resultado: any = await this.prismaService.schedule.findMany({
      where: {
        profissionalId: professional,
        data: {
          gte: inicioDoDia,
          lte: fimDoDia,
        },
      },
      include: { services: true },
    });

    return resultado;
  }
}
