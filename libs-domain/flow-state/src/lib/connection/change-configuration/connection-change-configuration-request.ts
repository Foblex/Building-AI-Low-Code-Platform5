import { IRequest, TKey } from '@core';

export class ConnectionChangeConfigurationRequest implements IRequest<void> {
  public static fToken = Symbol('ConnectionChangeConfigurationRequest');

  constructor(
    public readonly key: TKey,
    public readonly configuration: Record<string, any>
  ) {}
}
