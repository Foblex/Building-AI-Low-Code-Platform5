import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FlowExecuteRequest } from '../domain/flow/execute/flow-execute-request';

@Controller('flow')
export class FlowController {
  constructor(private readonly _commandBus: CommandBus) {}

  @Post('execute')
  async call(@Body() body: FlowExecuteRequest) {
    return this._commandBus.execute(
      new FlowExecuteRequest(body?.nodeType, body?.configuration, body?.nodeKey)
    );
  }
}
