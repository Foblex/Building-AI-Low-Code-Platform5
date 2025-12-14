import { FCreateConnectionEvent } from '@foblex/flow';
import { IRequest } from '@core';

export class ConnectionCreateRequest implements IRequest<void> {
  public static fToken = Symbol('ConnectionCreateRequest');

  constructor(public readonly event: FCreateConnectionEvent) {}
}
