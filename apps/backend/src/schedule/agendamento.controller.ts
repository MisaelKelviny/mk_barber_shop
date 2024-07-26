import { Agendamento, ObterHorariosOcupados } from '@barba/core';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AgendamentoRepository } from './schedule.repository';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly repo: AgendamentoRepository) {}

  @Post()
  criar(@Body() schedule: Agendamento) {
    return this.repo.criar(schedule);
  }

  @Get(':email')
  buscarPorEmail(@Param('email') email: string) {
    return this.repo.buscarPorEmail(email);
  }

  @Get('ocupacao/:professional/:data')
  buscarOcupacaoPorProfissionalEData(
    @Param('professional') professional: string,
    @Param('data') dataParam: string,
  ) {
    const casoDeUso = new ObterHorariosOcupados(this.repo);
    return casoDeUso.executar(+professional, new Date(dataParam));
  }
}
