import { HttpStatusCode } from 'axios';
import { ErrorResponse } from '../contracts/error-response';
import { ExceptionHandlerResult } from '../exception-handler-result';
import { randomUUID } from 'crypto';
import { Exception } from '../exception';

export abstract class BaseExceptionHandler<TException extends Exception> {
  public handler(exception: TException): ExceptionHandlerResult {
    return new ExceptionHandlerResult(
      this.getHttpStatusCode(exception),
      this.getErrorResponse(exception)
    );
  }

  protected abstract getHttpStatusCode(exception?: TException): HttpStatusCode;

  protected abstract fillErrors(
    errorResponse: ErrorResponse,
    exception: TException
  ): void;

  protected getErrorResponse(exception: TException): ErrorResponse {
    const errorResponse = new ErrorResponse(randomUUID());

    this.fillErrors(errorResponse, exception);

    return errorResponse;
  }
}
