import { Module } from '@nestjs/common';
import { FlowExecuteHandler } from './execute/flow-execute-handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [FlowExecuteHandler],
})
export class FlowModule {}
