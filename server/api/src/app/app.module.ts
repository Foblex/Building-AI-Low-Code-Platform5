import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FlowModule } from './domain/flow/flow.module';
import { FlowController } from './api/flow.controller';
import { ExceptionsFilter } from '@server/exceptions';

@Module({
  imports: [CqrsModule.forRoot(), FlowModule],
  controllers: [FlowController],
  providers: [ExceptionsFilter],
})
export class AppModule {}
