import { BaseExceptionHandler } from './base-exception-handler';
import { BusinessException } from '../exceptions/business-exception';
import { ErrorResponse } from '../contracts/error-response';
import { HttpStatusCode } from 'axios';
import { ForbiddenException } from '../exceptions/forbidden-exception';
import { NotFoundException } from '../exceptions/not-found-exception';

export class BusinessExceptionHandler extends BaseExceptionHandler<BusinessException> {
  protected override getHttpStatusCode(
    exception: BusinessException
  ): HttpStatusCode {
    if (exception instanceof ForbiddenException) {
      return HttpStatusCode.Forbidden;
    } else if (exception instanceof NotFoundException) {
      return HttpStatusCode.NotFound;
    }
    return HttpStatusCode.BadRequest;
  }

  protected override fillErrors(
    errorResponse: ErrorResponse,
    exception: BusinessException
  ): void {
    errorResponse.errors.push({
      key: exception.error.key,
      code: exception.error.code,
      message: exception.error.message,
      systemMessage: exception.error.systemMessage,
    });
  }
}
