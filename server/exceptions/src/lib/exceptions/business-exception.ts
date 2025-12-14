import { ErrorDescription } from '../contracts/error-description';
import { Exception } from '../exception';

export abstract class BusinessException extends Exception {
  protected constructor(public error: ErrorDescription) {
    super(error.message);
  }
}
