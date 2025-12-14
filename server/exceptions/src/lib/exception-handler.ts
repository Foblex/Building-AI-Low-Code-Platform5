import { ExceptionHandlerResult } from './exception-handler-result';
import { BusinessException } from './exceptions/business-exception';
import { BusinessExceptionHandler } from './handlers/business-exception-handler';
import { ValidationException } from './exceptions/validation-exception';
import { ValidationExceptionHandler } from './handlers/validation-exception-handler';
import { Exception } from './exception';
import { UnhandledExceptionHandler } from './handlers/unhandled-exception-handler';

export class ExceptionHandler {
  public handle(exception: Exception): ExceptionHandlerResult {
    if (exception instanceof BusinessException) {
      return this._handleBusinessException(exception);
    } else if(exception instanceof ValidationException) {
      return this._handleValidationException(exception);
    }
    return this._handleUnhandledException(exception);
  }

  private _handleBusinessException(exception: BusinessException): ExceptionHandlerResult {
    return new BusinessExceptionHandler().handler(exception);
  }

  private _handleValidationException(exception: ValidationException): ExceptionHandlerResult {
    return new ValidationExceptionHandler().handler(exception);
  }

  private _handleUnhandledException(exception: Exception): ExceptionHandlerResult {
    return new UnhandledExceptionHandler().handler(exception);
  }
}
