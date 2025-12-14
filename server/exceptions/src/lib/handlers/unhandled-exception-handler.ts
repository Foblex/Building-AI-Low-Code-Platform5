import { BaseExceptionHandler } from './base-exception-handler';
import { ErrorResponse } from '../contracts/error-response';
import { HttpStatusCode } from 'axios';

export class UnhandledExceptionHandler extends BaseExceptionHandler<Error> {
  protected override getHttpStatusCode(): HttpStatusCode {
    return HttpStatusCode.InternalServerError;
  }

  protected override fillErrors(
    errorResponse: ErrorResponse,
    exception: Error
  ): void {
    errorResponse.errors.push({
      key: HttpStatusCode.InternalServerError.toString(),
      code: HttpStatusCode.InternalServerError.toString(),
      message: 'Internal server error',
      systemMessage: `${exception.message} ${exception.stack}`
    });
  }
}
