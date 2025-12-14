import { Injector, Type } from '@angular/core';
import { DefaultLogger, ILogger, LOGGER_TOKEN } from '../logger';

export interface IRequest<TResponse> {}

export interface ICommand<
  TRequest extends IRequest<TResponse>,
  TResponse = void
> extends IHandler<TRequest, TResponse> {}

export interface IQuery<TRequest extends IRequest<TResponse>, TResponse>
  extends IHandler<TRequest, TResponse> {}

export type Token<TRequest, TResponse> = symbol & {
  __req?: TRequest;
  __res?: TResponse;
};

export const createToken = <TRequest, TResponse>(desc = 'feature') =>
  Symbol(desc) as Token<TRequest, TResponse>;

export interface IRequestType<TRequest extends IRequest<TResponse>, TResponse> {
  new (...args: any[]): TRequest;
  fToken: Token<TRequest, TResponse>;
}

export interface IHandler<TRequest = void, TResponse = void> {
  handle(request: TRequest, ...args: any[]): TResponse;
}

export type Constructor<T = unknown> = new (...args: any[]) => T;

export function MediatorRegister<
  TRequest extends IRequest<TResponse>,
  TResponse
>(requestType: IRequestType<TRequest, TResponse>) {
  return function (constructor: Constructor<IHandler<TRequest, TResponse>>) {
    Mediator.register(requestType, constructor);
  };
}

const _features = new Map<Token<any, any>, Type<IHandler<any, any>>>();

export class Mediator {

  private readonly _logger: ILogger = new DefaultLogger();

  constructor(private readonly _injector: Injector) {
    this._logger = _injector.get(LOGGER_TOKEN, new DefaultLogger());
  }

  public send<TRequest extends IRequest<TResponse>, TResponse>(
    request: any
  ): TResponse {
    const token = request.constructor.fToken;

    const handlerType = _features.get(token) as
      | Type<IHandler<TRequest, TResponse>>
      | undefined;
    if (!handlerType) {
      throw new Error(
        `No handler registered for token: ${String(
          token.description ?? token.toString()
        )}`
      );
    }

    this._logger.log('feature', handlerType, request);
    const handler = this._injector.get(handlerType) as IHandler<
      TRequest,
      TResponse
    >;
    return handler.handle(request);
  }

  public static register<TRequest extends IRequest<TResponse>, TResponse>(
    requestType: IRequestType<TRequest, TResponse>,
    handler: Type<IHandler<TRequest, TResponse>>
  ): void {
    console.log(requestType.fToken);
    if (!requestType?.fToken) {
      throw new Error('Type must have static fToken');
    }
    _features.set(requestType.fToken, handler);
  }
}
