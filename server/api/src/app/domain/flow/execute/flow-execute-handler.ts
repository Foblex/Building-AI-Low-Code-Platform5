import { FlowExecuteRequest } from './flow-execute-request';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FlowExecuteValidator } from './flow-execute-validator';
import { FlowExecuteResponse } from './flow-execute-response';
import {
  executeNode,
} from '../../../infrastructure/ai/execute-node';
import { ExecutionResult } from '../execution-result';

@CommandHandler(FlowExecuteRequest)
export class FlowExecuteHandler implements ICommandHandler<FlowExecuteRequest> {
  private readonly _validator = new FlowExecuteValidator();

  async execute(request: FlowExecuteRequest): Promise<FlowExecuteResponse> {
    await this._validator.validate(request);

    const startTime = Date.now();
    try {
      // Get the prompt and previous result from configuration
      const { prompt, previousResult, incomingData, nodeType } = request.configuration;
      console.log(request.configuration);

      // Use 'prompt' for most nodes, but 'incomingData' for START node
      const basePrompt = (nodeType === 'START' && incomingData !== undefined)
        ? incomingData
        : prompt;

      // Combine prompt with previous result context
      const fullPrompt = previousResult
        ? `Previous result: ${JSON.stringify(previousResult)}\n\n${basePrompt}`
        : basePrompt;

      const { result } = await executeNode({ prompt: fullPrompt });
      const executionTime = Date.now() - startTime;

      return new FlowExecuteResponse(new ExecutionResult(
        result,
        request.nodeKey,
        executionTime,
        'success',
        null
      ));
    } catch (error) {
      const executionTime = Date.now() - startTime;
      return new FlowExecuteResponse(new ExecutionResult(
        null,
        request.nodeKey,
        executionTime,
        'error',
        error.message || 'Unknown error'
      ));
    }
  }
}
