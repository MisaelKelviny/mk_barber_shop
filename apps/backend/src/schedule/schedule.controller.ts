import { GetBusyHours, Schedule } from '@barber/core';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly repo: ScheduleRepository) {}

  @Post()
  create(@Body() schedule: Schedule) {
    return this.repo.create(schedule);
  }

  @Get(':email')
  searchForEmail(@Param('email') email: string) {
    return this.repo.searchForEmail(email);
  }

  @Get('occupation/:professional/:date')
  getOccupationForProfessionalAndDate(
    @Param('professional') professional: string,
    @Param('date') dataParam: string,
  ) {
    const useCase = new GetBusyHours(this.repo);
    return useCase.executar(+professional, new Date(dataParam));
  }
}
