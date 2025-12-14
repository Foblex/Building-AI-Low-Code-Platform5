import { ErrorDescription } from '../contracts';
import { Exception } from '../exception';

export class ValidationException extends Exception {
  constructor(public errors: ErrorDescription[]) {
    super('');
  }
}
