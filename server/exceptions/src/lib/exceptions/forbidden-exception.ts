import { BusinessException } from './business-exception';
import { ErrorDescription } from '../contracts/error-description';
import { ErrorKeys } from '../error-keys';
import { HttpStatusCode } from 'axios';

export class ForbiddenException extends BusinessException {
  constructor(
    error: ErrorDescription = {
      key: ErrorKeys.REQUEST_ERROR,
      code: HttpStatusCode.Forbidden.toString(),
    }
  ) {
    super(error);
  }
}
