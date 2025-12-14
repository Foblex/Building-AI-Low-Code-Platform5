import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ExceptionHandler } from './exception-handler';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(Error)
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly _adapterHost: HttpAdapterHost) {}

  public catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const { httpStatusCode, errorResponse } = new ExceptionHandler().handle(
      exception
    );

    this._adapterHost.httpAdapter.reply(
      response,
      errorResponse,
      httpStatusCode
    );
  }
}
