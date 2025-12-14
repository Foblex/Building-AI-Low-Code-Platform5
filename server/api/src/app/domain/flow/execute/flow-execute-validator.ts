import { FlowExecuteRequest } from './flow-execute-request';
import { IValidator } from '../../../infrastructure/i-validator';
import { ErrorDescription, ValidationException } from '@server/exceptions';

export class FlowExecuteValidator implements IValidator<FlowExecuteRequest> {
  async validate(request: FlowExecuteRequest): Promise<void> {
    const errors: ErrorDescription[] = [];

    if (!request.nodeType) {
      errors.push({
        key: 'nodeType',
        code: '',
        message: 'Node type is required',
      });
    }

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }
  }
}
