import { Command } from '@nestjs/cqrs';
import { FlowExecuteResponse } from './flow-execute-response';
import { ENodeType } from '@flow-state';

export class FlowExecuteRequest extends Command<FlowExecuteResponse> {

  constructor(
    public readonly nodeType: ENodeType,
    public readonly configuration: any,
    public readonly nodeKey?: string
  ) {
    super();
  }
}
