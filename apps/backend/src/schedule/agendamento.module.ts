import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AgendamentoController } from './schedule.controller';
import { AgendamentoRepository } from './schedule.repository';

@Module({
  imports: [DbModule],
  controllers: [AgendamentoController],
  providers: [AgendamentoRepository],
})
export class AgendamentoModule {}
