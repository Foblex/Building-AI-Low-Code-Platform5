import { DataResponse } from '../../../infrastructure/contracts/data-response';
import { ExecutionResult } from '../execution-result';

export class FlowExecuteResponse extends DataResponse<ExecutionResult> {
  constructor(data: ExecutionResult) {
    super(data);
  }
}
