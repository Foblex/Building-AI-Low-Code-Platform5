import { BaseExceptionHandler } from './base-exception-handler';
import { ErrorResponse } from '../contracts';
import { HttpStatusCode } from 'axios';
import { ValidationException } from '../exceptions';

export class ValidationExceptionHandler extends BaseExceptionHandler<ValidationException> {
  protected override getHttpStatusCode(): HttpStatusCode {
    return HttpStatusCode.BadRequest;
  }

  protected override fillErrors(
    errorResponse: ErrorResponse,
    exception: ValidationException
  ): void {
    exception.errors.forEach(error => {
      errorResponse.errors.push({
        key: error.key,
        code: error.code,
        message: error.message,
      });
    })
  }
}
