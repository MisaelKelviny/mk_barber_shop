import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ScheduleController } from './schedule.controller';
import { ScheduleRepository } from './schedule.repository';

@Module({
  imports: [DbModule],
  controllers: [ScheduleController],
  providers: [ScheduleRepository],
})
export class ScheduleModule {}
