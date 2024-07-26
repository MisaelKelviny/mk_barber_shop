import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AgendamentoModule } from './schedule/schedule.module';
import { ServicoModule } from './servico/servico.module';

@Module({
  imports: [DbModule, ServicoModule, AgendamentoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
