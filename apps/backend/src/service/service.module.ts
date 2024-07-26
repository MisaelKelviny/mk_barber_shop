import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ServiceController } from './service.controller';

@Module({
  imports: [DbModule],
  controllers: [ServiceController],
})
export class ServiceModule {}
