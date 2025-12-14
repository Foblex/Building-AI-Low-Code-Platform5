import { IRequest, TKey } from '@core';

export class ConnectionRemoveRequest implements IRequest<void> {
  public static fToken = Symbol('ConnectionRemoveRequest');

  constructor(public readonly key: TKey) {}
}
