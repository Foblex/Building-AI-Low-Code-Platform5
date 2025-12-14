import { BusinessException } from './business-exception';
import { ErrorDescription } from '../contracts/error-description';

export abstract class BadRequestException extends BusinessException {
  protected constructor(error: ErrorDescription) {
    super(error);
  }
}
